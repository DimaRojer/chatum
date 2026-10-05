"use client";

import { useEffect, useRef, useState } from "react";
import type { Message } from "@/types/message";
import type { User } from "@/types/user";

import { EmojiPicker } from "@/components/chat/EmojiPicker/EmojiPicker";
import { Icon } from "@/components/ui/Icon/Icon";
import { Attachments } from "@/components/chat/Attachments/Attachments";

import { meService } from "@/services/me";

import "./ChatInput.scss";

interface ChatInputProps {
    attachments: File[];
    onRemoveAttachment: (index: number) => void;
    onFiles: (files: File[]) => void;
    onClearAttachments: () => void;
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    editingMessage: Message | null;
    onCancelEdit: () => void;
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    replyingMessage: Message | null;
    onCancelReply: () => void;
}

export const ChatInput = ({
    attachments,
    onRemoveAttachment,
    onFiles,
    onClearAttachments,
    setMessages,
    editingMessage,
    onCancelEdit,
    message,
    setMessage,
    replyingMessage,
    onCancelReply,
}: ChatInputProps) => {
    const [isEmojiOpen, setIsEmojiOpen] = useState(false);
    const [currentUser, setCurrentUser] =
        useState<User | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        meService
            .get()
            .then((user) => {
                console.log("CURRENT USER:", user);
                setCurrentUser(user);
            })
            .catch((error) => {
                console.error("ME ERROR:", error);
            });
    }, []);

    const resizeTextarea = () => {
        if (!textareaRef.current) return;

        textareaRef.current.style.height = "24px";
        textareaRef.current.style.height =
            `${textareaRef.current.scrollHeight}px`;
    };

    useEffect(() => {
        if (!editingMessage && !replyingMessage) return;

        requestAnimationFrame(() => {
            if (editingMessage) {
                resizeTextarea();
            }

            textareaRef.current?.focus();
        });
    }, [editingMessage, replyingMessage]);

    const handleEmojiSelect = (emoji: string) => {
        setMessage((prev) => prev + emoji);
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        event.target.style.height = "24px";

        if (event.target.value.trim()) {
            event.target.style.height =
                `${event.target.scrollHeight}px`;
        }

        setMessage(event.target.value);
    };

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!event.target.files) return;

        onFiles(Array.from(event.target.files));
        event.target.value = "";
    };

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!currentUser) {
            return;
        }

        if (editingMessage) {
            if (!message.trim()) return;

            setMessages((prev) =>
                prev.map((item) =>
                    item.id === editingMessage.id
                        ? {
                            ...item,
                            text: message.trim(),
                            edited: true,
                        }
                        : item
                )
            );

            setMessage("");
            onCancelEdit();

            if (textareaRef.current) {
                textareaRef.current.style.height = "24px";
            }

            return;
        }

        if (
            !message.trim() &&
            attachments.length === 0
        ) {
            return;
        }

        const messageAttachments =
            attachments.map((file) => ({
                name: file.name,
                type: file.type,
                size: file.size,
                url: URL.createObjectURL(file),
            }));

        setMessages((prev) => {
            const id = prev.length
                ? Math.max(
                    ...prev.map(
                        (message) => message.id
                    )
                ) + 1
                : 1;

            return [
                ...prev,
                {
                    id,
                    userId: currentUser.id,
                    time: new Date().toLocaleTimeString(
                        [],
                        {
                            hour: "2-digit",
                            minute: "2-digit",
                        }
                    ),
                    text: message.trim(),
                    attachments: messageAttachments,
                    ...(replyingMessage && {
                        replyToId: replyingMessage.id,
                    }),
                },
            ];
        });

        setMessage("");
        onClearAttachments();
        onCancelReply();

        if (textareaRef.current) {
            textareaRef.current.style.height = "24px";
        }
    };

    const handleCancelEdit = () => {
        setMessage("");
        onCancelEdit();

        if (textareaRef.current) {
            textareaRef.current.style.height = "24px";
        }
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
        }
    };

    return (
        <div className="chat-input">
            {editingMessage && (
                <div className="tooltip">
                    <div className="tooltip__wrapper">
                        <Icon
                            className="tooltip__icon"
                            name="edit"
                            width={20}
                            height={20}
                        />

                        <div className="tooltip__info">
                            <div className="tooltip__title">
                                Редактирование сообщения
                            </div>

                            <p className="tooltip__text">
                                {editingMessage.text}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="btn-svg"
                    >
                        <Icon name="close" />
                    </button>
                </div>
            )}

            {replyingMessage && (
                <div className="tooltip">
                    <div className="tooltip__wrapper">
                        <Icon
                            className="tooltip__icon"
                            name="reply"
                            width={20}
                            height={20}
                        />

                        <div className="tooltip__info">
                            <div className="tooltip__title">
                                Ответ на сообщение
                            </div>

                            <p className="tooltip__text">
                                {replyingMessage.text}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onCancelReply}
                        className="btn-svg"
                    >
                        <Icon name="close" />
                    </button>
                </div>
            )}

            <Attachments
                files={attachments}
                onRemove={onRemoveAttachment}
            />

            <form onSubmit={handleSubmit}>
                <div className="chat-input__wrapper">
                    <button
                        className="btn-svg"
                        type="button"
                        onClick={() =>
                            inputRef.current?.click()
                        }
                    >
                        <Icon
                            name="paperclip"
                            width={20}
                            height={20}
                        />
                    </button>

                    <input
                        ref={inputRef}
                        type="file"
                        multiple
                        hidden
                        onChange={handleFileChange}
                    />

                    <textarea
                        ref={textareaRef}
                        className="chat-input__field"
                        value={message}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Сообщение..."
                    />

                    <div
                        className="chat-input__emoji"
                        onMouseEnter={() =>
                            setIsEmojiOpen(true)
                        }
                        onMouseLeave={() =>
                            setIsEmojiOpen(false)
                        }
                    >
                        <button
                            type="button"
                            className="btn-svg"
                        >
                            <Icon
                                name="smile"
                                width={20}
                                height={20}
                            />
                        </button>

                        <div
                            className={`emoji-picker-wrapper ${
                                isEmojiOpen
                                    ? "is-open"
                                    : ""
                            }`}
                        >
                            <EmojiPicker
                                onSelect={
                                    handleEmojiSelect
                                }
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="chat-input__btn-send"
                    >
                        <Icon
                            className="rotate-180"
                            name="arrow"
                            width={20}
                            height={20}
                        />
                    </button>
                </div>
            </form>
        </div>
    );
};