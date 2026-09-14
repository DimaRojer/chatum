"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";

import { users } from "@/data/users";
import { directChats } from "@/data/directChats";
import { currentUserId } from "@/data/currentUser";

import { FileUpload } from "@/components/chat/FileUpload/FileUpload";
import { ChatList } from "@/components/chat/ChatList/ChatList";
import { ChatInput } from "@/components/chat/ChatInput/ChatInput";

interface UserPageProps {
    params: Promise<{
        userId: string;
    }>;
}

export default function UserPage({ params,}: UserPageProps) {
    const { userId } = use(params);
    const user = users.find(
        (user) => user.id === Number(userId)
    );
    if (!user) notFound();
    const chat = directChats.find((chat) => chat.userIds.includes(currentUserId) && chat.userIds.includes(user.id));
    if (!chat) notFound();
    const [messages, setMessages] = useState(chat.messages);
    const [attachments, setAttachments] = useState<File[]>( []);
    const addAttachments = (files: File[]) => {
        setAttachments((prev) => [ ...prev, ...files,]);
    };

    const removeAttachment = (index: number) => {
        setAttachments((prev) =>
            prev.filter(
                (_, fileIndex) =>
                    fileIndex !== index
            )
        );
    };
    const clearAttachments = () => setAttachments([]);
    return (
        <>
            <FileUpload onFiles={addAttachments} />
            <ChatList messages={messages} users={users}/>
            <ChatInput
                onFiles={addAttachments}
                setMessages={setMessages}
                attachments={attachments}
                onRemoveAttachment={removeAttachment}
                onClearAttachments={clearAttachments}
            />
        </>
    );
}