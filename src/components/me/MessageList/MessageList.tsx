"use client";

import "./MessageList.scss";

import { useRouter } from "next/navigation";

import type { User } from "@/types/user";
import type { SearchMessage } from "@/types/search-message";

interface MessageListProps {
    messages: SearchMessage[];
    users: User[];
}

export const MessageList = ({
    messages,
    users,
}: MessageListProps) => {
    const router = useRouter();

    const handleMessageClick = (
        item: SearchMessage
    ) => {
        if (
            item.type === "group" &&
            item.groupId &&
            item.channelId
        ) {
            router.push(
                `/${item.groupId}/${item.channelId}?message=${item.message.id}`
            );

            return;
        }

        if (
            item.type === "people" &&
            item.userId
        ) {
            router.push(
                `/me/${item.userId}?message=${item.message.id}`
            );
        }
    };

    return (
        <div className="message-list">
				{messages.map((item) => {
					const {
						key,
						message,
						title,
					} = item;
                    const user = users.find(
                        (user) =>
                            user.id ===
                            message.userId
                    );
                    return (
                        <button
                            key={key}
                            type="button"
                            className="message-list__item"
							onClick={() =>
								handleMessageClick(item)
							}
                        >
                            <div className="message-list__head">
                                <span className="message-list__title">
                                    {title}
                                </span>
                                <span className="message-list__time">
                                    {message.time}
                                </span>
                            </div>
                            {item.type === "group" && (
                                <div className="message-list__author">
                                    {user?.name}
                                </div>
                            )}
                            <div className="message-list__text">
                                {message.text}
                            </div>
                        </button>
                    );
                }
            )}
        </div>
    );
};