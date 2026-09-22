"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";

import { users } from "@/data/users";
import { directChats } from "@/data/directChats";
import { currentUserId } from "@/data/currentUser";

import type { Message } from "@/types/message";

import { FileUpload } from "@/components/chat/FileUpload/FileUpload";
import { ChatList } from "@/components/chat/ChatList/ChatList";
import { ChatInput } from "@/components/chat/ChatInput/ChatInput";

interface UserPageProps {
    params: Promise<{
        userId: string;
    }>;
}

export default function UserPage({
    params,
}: UserPageProps) {
    const [replyingMessage, setReplyingMessage] =
    useState<Message | null>(null);
    
    const { userId } = use(params);

    const user = users.find(
        (user) => user.id === Number(userId)
    );

    if (!user) {
        notFound();
    }

    const chat = directChats.find(
        (chat) =>
            chat.userIds.includes(currentUserId) &&
            chat.userIds.includes(user.id)
    );

    if (!chat) {
        notFound();
    }

    const [messages, setMessages] = useState<Message[]>(
        chat.messages
    );

    const [message, setMessage] = useState("");

    const [editingMessage, setEditingMessage] =
        useState<Message | null>(null);

    const [attachments, setAttachments] =
        useState<File[]>([]);

    const addAttachments = (files: File[]) => {
        setAttachments((prev) => [
            ...prev,
            ...files,
        ]);
    };

    const removeAttachment = (index: number) => {
        setAttachments((prev) =>
            prev.filter(
                (_, fileIndex) =>
                    fileIndex !== index
            )
        );
    };

    const clearAttachments = () => {
        setAttachments([]);
    };

    const handleEdit = (message: Message) => {
        setEditingMessage(message);
        setReplyingMessage(null);
        setMessage(message.text);
    };
    const handleCancelEdit = () => {
        setEditingMessage(null);
        setMessage("");
    };

    const handleReply = (message: Message) => {
        setReplyingMessage(message);
        setEditingMessage(null);
        setMessage("");
    };
    const handleCancelReply = () => {
        setReplyingMessage(null);
    };

    return (
        <>
            <FileUpload
                onFiles={addAttachments}
            />

            <ChatList
                messages={messages}
                users={users}
                setMessages={setMessages}
                onEdit={handleEdit}
                onReply={handleReply}
            />

            <ChatInput
                attachments={attachments}
                onRemoveAttachment={removeAttachment}
                onFiles={addAttachments}
                onClearAttachments={clearAttachments}
                setMessages={setMessages}
                editingMessage={editingMessage}
                onCancelEdit={handleCancelEdit}
                replyingMessage={replyingMessage}
                onCancelReply={handleCancelReply}
                message={message}
                setMessage={setMessage}
            />
        </>
    );
}