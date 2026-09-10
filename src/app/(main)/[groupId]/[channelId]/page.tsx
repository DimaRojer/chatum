"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";

import { useGroups } from "@/context/GroupContext";
import { users } from "@/data/users";

import { FileUpload } from "@/components/chat/FileUpload/FileUpload";
import { ChatList } from "@/components/chat/ChatList/ChatList";
import { ChatInput } from "@/components/chat/ChatInput/ChatInput";

interface ChannelPageProps {
    params: Promise<{
        groupId: string;
        channelId: string;
    }>;
}

export default function ChannelPage({ params,}: ChannelPageProps) {
    const { groupId, channelId } = use(params);
    const { groups } = useGroups();
    const group = groups.find( (group) => group.id === groupId);
    const channel = group?.channels.find( (channel) => channel.id === channelId);
    if (!channel) notFound();
    const [messages, setMessages] = useState( channel.messages);
    const [attachments, setAttachments] = useState<File[]>([]);
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

    const clearAttachments = () => { setAttachments([])};
    return (
        <>
            <FileUpload onFiles={addAttachments}/>
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