import "./ChatItem.scss";

import Image from "next/image";
import { useEffect, useRef } from "react";

import type { Message } from "@/types/message";
import type { User } from "@/types/user";
import { useSearchParams } from "next/navigation";
import { ContextMenu } from "@/components/ui/ContextMenu/ContextMenu";
import { Icon } from "@/components/ui/Icon/Icon";
import { useMessageSelection } from "@/context/MessageSelectionContext";
import { useUser } from "@/context/UserContext";

interface ChatItemProps {
    message: Message;
    user: User;
    users: User[];
    isGrouped: boolean;
    messages: Message[];
    onDelete: (messageId: number) => void;
    onEdit: (message: Message) => void;
    onReply: (message: Message) => void;
}

export const ChatItem = ({
    message,
    user,
    isGrouped,
    messages,
    onDelete,
    onEdit,
    onReply,
    users,
}: ChatItemProps) => {
    const { user: currentUser } = useUser();
    const { selectedMessageId, selectMessage } = useMessageSelection();
    const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isSelected = selectedMessageId === message.id;
    const replyMessage = message.replyToId
        ? messages.find((item) => item.id === message.replyToId)
        : null;
        const replyUser = users.find(
            (user) => user.id === replyMessage?.userId
        );
    const imageAttachments =
        message.attachments?.filter((attachment) =>
            attachment.type.startsWith("image/")
        ) ?? [];

    const fileAttachments =
        message.attachments?.filter(
            (attachment) => !attachment.type.startsWith("image/")
        ) ?? [];

    const handleTouchStart = () => {
        holdTimer.current = setTimeout(() => {
            selectMessage(message.id);
        }, 500);
    };

    const handleTouchEnd = () => {
        if (holdTimer.current) {
            clearTimeout(holdTimer.current);
            holdTimer.current = null;
        }
    };

    const searchParams = useSearchParams();
    const messageId = searchParams.get("message");
    const messageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messageId !== String(message.id)) {
            return;
        }

        const element = messageRef.current;

        if (!element) {
            return;
        }

        element.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });

        element.classList.add("message--highlight");
        const timeout = setTimeout(() => {
            element.classList.remove("message--highlight");
        }, 2500);
        return () => {
            clearTimeout(timeout);
        };
    }, [messageId, message.id]);
    
    const getFileIcon = (fileName: string) => {
        const extension = fileName.split(".").pop()?.toLowerCase();
        switch (extension) {
            case "doc":
            case "docx":
                return "doc";
            case "pdf":
                return "pdf";
            case "xls":
            case "xlsx":
                return "xls";
            case "zip":
                return "zip";
            default:
                return "doc";
        }
    };

    const handleReplyClick = (
        messageId: number
    ) => {
        const element = document.getElementById(
            `message-${messageId}`
        );

        if (!element) {
            return;
        }

        element.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });

        element.classList.remove(
            "message--highlight"
        );

        requestAnimationFrame(() => {
            element.classList.add(
                "message--highlight"
            );
        });

        setTimeout(() => {
            element.classList.remove(
                "message--highlight"
            );
        }, 2500);
    };
    const contextMenuContent = (
        <>
            <button
                type="button"
                onClick={() => {
                    const url = new URL(window.location.href);

                    url.searchParams.set(
                        "message",
                        String(message.id)
                    );

                    navigator.clipboard.writeText(url.toString());
                }}
            >
                Копировать ссылку
            </button>
            <button type="button" onClick={() => onReply(message)}>
                Ответить
            </button>
            <button
                type="button"
                onClick={() => navigator.clipboard.writeText(message.text)}
            >
                Копировать
            </button>
            {currentUser && message.userId === currentUser.id && (
                <>
                    <button type="button" onClick={() => onEdit(message)}>
                        Изменить
                    </button>
                    <button
                        type="button"
                        onClick={() => onDelete(message.id)}
                        className="text-red"
                    >
                        Удалить
                    </button>
                </>
            )}
        </>
    );
    const shouldShowHeader = !isGrouped || replyMessage;
    return (
        <ContextMenu menu={contextMenuContent}>
            <div
                ref={messageRef}
                id={`message-${message.id}`}
                className={`message ${ isSelected ? "message--selected" : ""}`}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchEnd}
            >
                {replyMessage && (
                    <button
                        type="button"
                        className="message__reply text-start"
                        onClick={() =>handleReplyClick(replyMessage.id)}
                    >
                        <div className="message__reply-name">
                            {replyUser?.name}
                        </div>
                        <p className="message__reply-text">{replyMessage.text}</p>
                    </button>
                )}
                <div className="message__body">
                    {shouldShowHeader && (
                        <div className="message__image">
                            <Image
                                width={36}
                                height={36}
                                className="avatar-image"
                                src={ user.avatar || "/default-avatar.jpg"}
                                alt={user.name}
                                unoptimized
                            />
                        </div>
                    )}
                    <div className="message-info">
                        {shouldShowHeader && (
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
                                                (attachment,index) => (
                                                    <a key={index} href={attachment.url} target="_blank" rel="noreferrer">
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
                                            {fileAttachments.map(( attachment, index) => {
                                                    const iconName = getFileIcon(attachment.name);
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

            </div>
        </ContextMenu>
    );
};