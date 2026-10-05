"use client";

import { useEffect, useState } from "react";

import { UserList } from "@/components/UserList/UserList";
import { SearchList } from "@/components/me/SearchList/SearchList";

import type { User } from "@/types/user";
import type { DirectChat } from "@/types/direct-chat";
import type { Group } from "@/types/group";
import type { SearchMessage } from "@/types/search-message";

import { directChatsService } from "@/services/directChats";
import { usersService } from "@/services/users";
import { meService } from "@/services/me";
import { groupsService } from "@/services/groups";

export default function Page() {
    const [isSearchOpen, setIsSearchOpen] =
        useState(false);

    const [currentUser, setCurrentUser] =
        useState<User | null>(null);

    const [users, setUsers] =
        useState<User[]>([]);

    const [directChats, setDirectChats] =
        useState<DirectChat[]>([]);

    const [groups, setGroups] =
        useState<Group[]>([]);

    useEffect(() => {
        meService
            .get()
            .then((user) => {
                setCurrentUser(user);
            })
            .catch((error) => {
                console.error(
                    "ME ERROR:",
                    error
                );
            });

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

        directChatsService
            .getAll()
            .then((chats) => {
                setDirectChats(chats);
            })
            .catch((error) => {
                console.error(
                    "DIRECT CHATS ERROR:",
                    error
                );
            });

        groupsService
            .getAll()
            .then((groups) => {
                setGroups(groups);
            })
            .catch((error) => {
                console.error(
                    "GROUPS ERROR:",
                    error
                );
            });
    }, []);

    if (!currentUser) {
        return null;
    }

    const myChats = directChats.filter(
        (chat) =>
            chat.userIds.includes(
                currentUser.id
            )
    );

    const searchMessages: SearchMessage[] = [
        ...myChats.flatMap((chat) => {
            const otherUserId =
                chat.userIds.find(
                    (userId) =>
                        userId !==
                        currentUser.id
                );

            const otherUser =
                users.find(
                    (user) =>
                        user.id ===
                        otherUserId
                );

            return chat.messages.map(
                (message) => ({
                    key: `people-${chat.id}-${message.id}`,
                    message,
                    type: "people" as const,
                    title:
                        otherUser?.name ??
                        "Пользователь",
                    userId: otherUserId,
                })
            );
        }),

        ...groups.flatMap((group) =>
            group.channels.flatMap(
                (channel) =>
                    channel.messages.map(
                        (message) => ({
                            key: `group-${group.id}-${channel.id}-${message.id}`,
                            message,
                            type: "group" as const,
                            title: group.name,
                            groupId: group.id,
                            channelId:
                                channel.id,
                        })
                    )
            )
        ),
    ];

    const chatUserIds = myChats
        .map((chat) =>
            chat.userIds.find(
                (userId) =>
                    userId !==
                    currentUser.id
            )
        )
        .filter(
            (userId): userId is number =>
                userId !== undefined
        );

    const chatUsers = users.filter(
        (user) =>
            chatUserIds.includes(user.id)
    );

    return (
        <div className="px-8 pt-4">
            <div className="mb-4">
                <div>
                    Привет, {currentUser.name}
                </div>

                <div>
                    Chatum — оставайтесь на
                    связи с коллегами,
                    обсуждайте проекты и
                    создавайте новые каналы.
                </div>
            </div>

            <div className="main-container">
                <SearchList
                    users={users}
                    messages={searchMessages}
                    onSearchOpen={
                        setIsSearchOpen
                    }
                />
            </div>

            {!isSearchOpen && (
                <div className="mt-6">
                    <UserList
                        users={chatUsers}
                        variant="compact"
                    />
                </div>
            )}
        </div>
    );
}