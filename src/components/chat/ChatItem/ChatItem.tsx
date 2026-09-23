import "./ChatItem.scss";

import Image from "next/image";
import { currentUserId } from "@/data/currentUser";
import type { Message } from "@/types/message";
import type { User } from "@/types/user";
import { ContextMenu } from "@/components/ui/ContextMenu/ContextMenu";
import { Icon } from "@/components/ui/Icon/Icon";
import { useRef } from "react";
import { useMessageSelection } from "@/context/MessageSelectionContext";
interface ChatItemProps {
    message: Message;
    user: User;
    isGrouped: boolean;
    messages: Message[];
    onDelete: (messageId: number) => void;
    onEdit: (message: Message) => void;
    onReply: (message: Message) => void;
}

export const ChatItem = ({ message, user, isGrouped, messages, onDelete, onEdit, onReply,
}: ChatItemProps) => {
const replyMessage = message.replyToId ? messages.find((item) => item.id === message.replyToId): null;
    const imageAttachments = message.attachments?.filter(
        (attachment) => attachment.type.startsWith("image/")
    ) ?? [];
    const fileAttachments = message.attachments?.filter(
        (attachment) => !attachment.type.startsWith("image/")
    ) ?? [];
    const { selectMessage } = useMessageSelection();
    const holdTimer = useRef<ReturnType<typeof setTimeout> | null>( null);
    const handleTouchStart = () => {
        holdTimer.current = setTimeout(() => { selectMessage(message.id)}, 500);
    };
    const handleTouchEnd = () => {
        if (holdTimer.current) {
            clearTimeout(holdTimer.current);
            holdTimer.current = null;
        }
    };
    return (
        <ContextMenu
            menu={
                <>
                    <button type="button" onClick={() => onReply(message)}>Ответить</button>
                    <button
                        type="button"
                        onClick={() => { navigator.clipboard.writeText( message.text);}}
                    >
                        Копировать
                    </button>

                    {message.userId === currentUserId && (
                        <>
                            <button
                                type="button"
                                onClick={() => { onEdit(message)}}
                            >
                                Изменить
                            </button>

                            <button
                                type="button"
                                onClick={() => {onDelete(message.id)}}
                                className="text-red"
                            >
                                Удалить
                            </button>
                        </>
                    )}
                </>
            }
        >
            <div 
                className="message"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchEnd}
            >
                {(!isGrouped || replyMessage) && (
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
                    {replyMessage && (
                        <div className="message__reply">
                            <p className="message__reply-text">{replyMessage.text}</p>
                        </div>
                    )}
                    {(!isGrouped || replyMessage) && (
                        <div className="message-info__header">
                            <div className="message-info__name">{user.name}</div>
                            <span className="message-info__time">{message.time}</span>
                        </div>
                    )}
                    <div className="message-info__content">
                        <div className="message-info__text-time">
                            {isGrouped && !replyMessage && (
                                <span className="message-info__time">{message.time}</span>
                            )}
                            <div className="message-item">
                                {message.text && (
                                    <div className="message-info__text-wrapper">
                                        <p className="message-info__text">{message.text}</p>
                                        {message.edited && (
                                            <Icon name="edit" width={14} height={14}/>
                                        )}
                                    </div>
                                )}
                                {imageAttachments.length > 0 && (
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

                                {fileAttachments.length > 0 && (
                                    <div className="attachment-container attachment-container--files">
                                        {fileAttachments.map(
                                            (attachment, index) => {
                                                const extension = attachment.name .split(".").pop()?.toLowerCase();
                                                const iconName =
                                                    extension === "doc" ||
                                                    extension === "docx"
                                                        ? "doc"
                                                        : extension === "pdf"
                                                        ? "pdf"
                                                        : extension === "xls" ||
                                                            extension === "xlsx"
                                                            ? "xls"
                                                            : extension === "zip"
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
                                                        <span className="message__attachment-name">{attachment.name}</span>
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
        </ContextMenu>
    );
};