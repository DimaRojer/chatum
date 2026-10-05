"use client";

import { useEffect, useRef, useState } from "react";

import { ChatItem } from "@/components/chat/ChatItem/ChatItem";
import { RemoveModal } from "@/components/ui/Modal/RemoveModal/RemoveModal";

import type { Message } from "@/types/message";
import type { User } from "@/types/user";

import { meService } from "@/services/me";

import "./ChatList.scss";

interface ChatListProps {
    messages: Message[];
    users: User[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    onEdit: (message: Message) => void;
    onReply: (message: Message) => void;
}

export const ChatList = ({
    messages,
    users,
    setMessages,
    onEdit,
    onReply,
}: ChatListProps) => {
    const [currentUser, setCurrentUser] =
        useState<User | null>(null);

    const [deleteMessageId, setDeleteMessageId] =
        useState<number | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] =
        useState(false);

    const chatListRef = useRef<HTMLDivElement>(null);

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

    const handleDeleteRequest = (messageId: number) => {
        setDeleteMessageId(messageId);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (deleteMessageId === null) return;

        setMessages((prev) =>
            prev.filter(
                (message) =>
                    message.id !== deleteMessageId
            )
        );

        setIsDeleteModalOpen(false);
        setDeleteMessageId(null);
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
        setDeleteMessageId(null);
    };

    useEffect(() => {
        const chatList = chatListRef.current;

        if (!chatList) return;

        chatList.scrollTo({
            top: chatList.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    if (!currentUser) {
        return null;
    }

    return (
        <>
            <div
                className="chat-list"
                ref={chatListRef}
            >
                {messages.map((message, index) => {
                    const user = users.find(
                        (user) =>
                            user.id === message.userId
                    );

                    if (!user) return null;

                    const previousMessage =
                        messages[index - 1];

                    const isGrouped =
                        !!previousMessage &&
                        previousMessage.userId ===
                            message.userId &&
                        previousMessage.time ===
                            message.time;

                    return (
                        <ChatItem
                            key={message.id}
                            message={message}
                            user={user}
                            isGrouped={isGrouped}
                            messages={messages}
                            onDelete={handleDeleteRequest}
                            onEdit={onEdit}
                            onReply={onReply}
                        />
                    );
                })}
            </div>

            <RemoveModal
                isOpen={isDeleteModalOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                title="Удалить сообщение?"
                description="Сообщение будет удалено без возможности восстановления."
                confirmText="Удалить"
                cancelText="Отмена"
            />
        </>
    );
};