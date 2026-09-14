import "./ChatItem.scss";

import Image from "next/image";

import type { Message } from "@/types/message";
import type { User } from "@/types/user";

interface ChatItemProps {
    message: Message;
    user: User;
    isGrouped: boolean;
}

export const ChatItem = ({message,user, isGrouped,}: ChatItemProps) => {
    const imageAttachments = message.attachments?.filter(
        (attachment) => attachment.type.startsWith("image/")
    ) ?? [];
    const fileAttachments = message.attachments?.filter(
        (attachment) => !attachment.type.startsWith("image/")
    ) ?? [];
    return (
        <div className="message">
            {!isGrouped && (
                <div className="message__image">
                    <Image
                        width={36}
                        height={36}
                        className="avatar-image"
                        src={user.avatar}
                        alt={user.name}
                        unoptimized
                    />
                </div>
            )}

            <div className="message-info">
                {!isGrouped && (
                    <div className="message-info__header">
                        <div className="message-info__name">
                            {user.name}
                        </div>

                        <span className="message-info__time">
                            {message.time}
                        </span>
                    </div>
                )}

                <div className="message-info__content">
                    <div className="message-info__text-time">
                        {isGrouped && (
                            <span className="message-info__time">
                                {message.time}
                            </span>
                        )}

                        <div className="message-item">
                            {message.text && (
                                <p className="message-info__text">
                                    {message.text}
                                </p>
                            )}

                            {imageAttachments?.length > 0 && (
                                <div className="attachment-container attachment-container--images">
                                    {imageAttachments.map(
                                        (attachment, index) => (
                                            <a
                                                key={index}
                                                href={attachment.url}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <Image
                                                    width={320}
                                                    height={320}
                                                    className="message__attachment"
                                                    src={attachment.url}
                                                    alt={attachment.name}
                                                />
                                            </a>
                                        )
                                    )}
                                </div>
                            )}

                            {fileAttachments?.length > 0 && (
                                <div className="attachment-container attachment-container--files">
                                    {fileAttachments.map(
                                        (attachment, index) => {
                                            const extension =
                                                attachment.name.split(".") .pop()?.toLowerCase();

                                            const iconName =
                                                extension === "doc" ||
                                                extension === "docx"
                                                    ? "doc"
                                                    : extension === "pdf"
                                                      ? "pdf"
                                                      : extension ===
                                                            "xls" ||
                                                          extension ===
                                                              "xlsx"
                                                        ? "xls"
                                                        : extension ===
                                                              "zip"
                                                          ? "zip"
                                                          : "doc";

                                            return (
                                                <a
                                                    key={index}
                                                    className="message__attachment message__attachment--file"
                                                    href={attachment.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <Image
                                                        className="message__attachment-icon"
                                                        src={`/icons/${iconName}.svg`}
                                                        alt=""
                                                        width={24}
                                                        height={24}
                                                    />

                                                    <span className="message__attachment-name">
                                                        {
                                                            attachment.name
                                                        }
                                                    </span>
                                                </a>
                                            );
                                        }
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};