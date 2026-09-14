import { useEffect, useRef } from "react";

import { ChatItem } from "@/components/chat/ChatItem/ChatItem";
import type { Message } from "@/types/message";
import type { User } from "@/types/user";

import "./ChatList.scss";

interface ChatListProps {
    messages: Message[];
    users: User[];
}

export const ChatList = ({ messages, users }: ChatListProps) => {
    const chatListRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const chatList = chatListRef.current;
        if (!chatList) return;
        chatList.scrollTo({ top: chatList.scrollHeight, behavior: "smooth"});
    }, [messages]);

    return (
        <div className="chat-list" ref={chatListRef}>
            {messages.map((message, index) => {
                const user = users.find((user) => user.id === message.userId);
                if (!user) return null;
                const previousMessage = messages[index - 1];
                const isGrouped =
                    previousMessage &&
                    previousMessage.userId === message.userId &&
                    previousMessage.time === message.time;
                return (
                    <ChatItem key={message.id} message={message} user={user}isGrouped={isGrouped}/>
                );
            })}
        </div>
    );
};