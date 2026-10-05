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

import { usersService } from "@/services/users";
import { directChatsService } from "@/services/directChats";

import { useUser } from "@/context/UserContext";

import type { User } from "@/types/user";
import type { DirectChat } from "@/types/direct-chat";
import type { Message } from "@/types/message";

import { FileUpload } from "@/components/chat/FileUpload/FileUpload";
import { ChatList } from "@/components/chat/ChatList/ChatList";
import { ChatInput } from "@/components/chat/ChatInput/ChatInput";

interface UserPageProps {
    params: Promise<{
        userId: string;
    }>;
}

interface DirectChatContentProps {
    chat: DirectChat;
    users: User[];
}

const DirectChatContent = ({
    chat,
    users,
}: DirectChatContentProps) => {

    const [messages, setMessages] =
        useState<Message[]>(chat.messages);

    const [replyingMessage, setReplyingMessage] =
        useState<Message | null>(null);

    const [message, setMessage] =
        useState("");

    const [editingMessage, setEditingMessage] =
        useState<Message | null>(null);

    const [attachments, setAttachments] =
        useState<File[]>([]);

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
                attachments={attachments}
                onRemoveAttachment={
                    removeAttachment
                }
                onFiles={addAttachments}
                onClearAttachments={
                    clearAttachments
                }
                setMessages={setMessages}
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

export default function UserPage({
    params,
}: UserPageProps) {
    const { user: currentUser } =
        useUser();

    const { userId } = use(params);

    const [users, setUsers] =
        useState<User[]>([]);

    const [directChats, setDirectChats] =
        useState<DirectChat[]>([]);

    const [isLoading, setIsLoading] =
        useState(true);

    useEffect(() => {
        Promise.all([
            usersService.getAll(),
            directChatsService.getAll(),
        ])
            .then(([users, chats]) => {
                setUsers(users);
                setDirectChats(chats);
            })
            .catch((error) => {
                console.error(
                    "USER PAGE ERROR:",
                    error
                );
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading || !currentUser) {
        return null;
    }

    const user = users.find(
        (user) =>
            user.id === Number(userId)
    );

    if (!user) {
        notFound();
    }

    const chat = directChats.find(
        (chat) =>
            chat.userIds.includes(
                currentUser.id
            ) &&
            chat.userIds.includes(
                user.id
            )
    );

    if (!chat) {
        notFound();
    }

    return (
        <DirectChatContent
            key={chat.id}
            chat={chat}
            users={users}
        />
    );
}