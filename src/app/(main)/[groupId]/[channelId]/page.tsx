"use client";

import {
    use,
    useEffect,
    useState,
} from "react";

import {
    notFound,
    useSearchParams,
} from "next/navigation";

import { useGroups } from "@/context/GroupContext";
import { usersService } from "@/services/users";

import type { User } from "@/types/user";
import type { Message } from "@/types/message";
import type { Channel } from "@/types/channel";

import { FileUpload } from "@/components/chat/FileUpload/FileUpload";
import { ChatList } from "@/components/chat/ChatList/ChatList";
import { ChatInput } from "@/components/chat/ChatInput/ChatInput";

interface ChannelPageProps {
    params: Promise<{
        groupId: string;
        channelId: string;
    }>;
}

interface ChannelContentProps {
    channel: Channel;
    users: User[];
}

const ChannelContent = ({
    channel,
    users,
}: ChannelContentProps) => {

    const [messages, setMessages] =
        useState<Message[]>(
            channel.messages
        );
    const [message, setMessage] =
        useState("");

    const [
        editingMessage,
        setEditingMessage,
    ] = useState<Message | null>(
        null
    );

    const [
        attachments,
        setAttachments,
    ] = useState<File[]>([]);

    const [
        replyingMessage,
        setReplyingMessage,
    ] = useState<Message | null>(
        null
    );

    const addAttachments = (
        files: File[]
    ) => {
        setAttachments((prev) => [
            ...prev,
            ...files,
        ]);
    };

    const removeAttachment = (
        index: number
    ) => {
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

    const handleEdit = (
        message: Message
    ) => {
        setEditingMessage(message);
        setReplyingMessage(null);
        setMessage(message.text);
    };

    const handleCancelEdit = () => {
        setEditingMessage(null);
        setMessage("");
    };

    const handleReply = (
        message: Message
    ) => {
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
                onFiles={addAttachments}
                setMessages={setMessages}
                attachments={attachments}
                onRemoveAttachment={
                    removeAttachment
                }
                onClearAttachments={
                    clearAttachments
                }
                editingMessage={
                    editingMessage
                }
                onCancelEdit={
                    handleCancelEdit
                }
                replyingMessage={
                    replyingMessage
                }
                onCancelReply={
                    handleCancelReply
                }
                message={message}
                setMessage={setMessage}
            />
        </>
    );
};

export default function ChannelPage({
    params,
}: ChannelPageProps) {
    const { groupId, channelId } =
        use(params);

    const { groups } = useGroups();

    const [users, setUsers] =
        useState<User[]>([]);

    useEffect(() => {
        usersService
            .getAll()
            .then((users) => {
                setUsers(users);
            })
            .catch((error) => {
                console.error(
                    "USERS ERROR:",
                    error
                );
            });
    }, []);

    const group = groups.find(
        (group) =>
            group.id ===
            Number(groupId)
    );

    const channel =
        group?.channels.find(
            (channel) =>
                channel.id ===
                Number(channelId)
        );

    if (groups.length === 0) {
        return null;
    }

    if (!group || !channel) {
        notFound();
    }

    return (
        <ChannelContent
            key={channel.id}
            channel={channel}
            users={users}
        />
    );
}