"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { usersService } from "@/services/users";
import { MeSidebar } from "@/components/Sidebar/MeSidebar/MeSidebar";
import { GroupSidebar } from "@/components/Sidebar/GroupSidebar/GroupSidebar";
import { ChatsSidebar } from "@/components/Sidebar/ChatsSidebar/ChatsSidebar";
import { Header } from "@/components/chat/Header/Header";
import { InfoSidebar } from "@/components/Sidebar/InfoSidebar/InfoSidebar";
import { MessageSelectionProvider } from "@/context/MessageSelectionContext";
import { useGroups } from "@/context/GroupContext";
import { useRecent } from "@/context/RecentContext";

import type { User } from "@/types/user";

interface ChatLayoutProps {
    children: React.ReactNode;
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (
        value: boolean
    ) => void;
}

export default function ChatLayout({
    children,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
}: ChatLayoutProps) {
    const pathname = usePathname();

    const { groups } = useGroups();
    const { addRecentUser } = useRecent();

    const [users, setUsers] =
        useState<User[]>([]);

    const [isInfoOpen, setIsInfoOpen] =
        useState(false);

    const isMe =
        pathname === "/me" ||
        pathname.startsWith("/me/");

    const isMePage =
        pathname === "/me";

    const isSettings =
        pathname === "/settings" ||
        pathname.startsWith("/settings/");

    const pathParts =
        pathname.split("/");

    const groupId = Number(
        pathParts[1]
    );

    const channelId = Number(
        pathParts[2]
    );

    const isGroupPage =
        !isMe &&
        !isSettings &&
        !Number.isNaN(groupId);

    const group = isGroupPage
        ? groups.find(
              (group) =>
                  group.id === groupId
          )
        : undefined;

    const channel = group
        ? group.channels.find(
              (channel) =>
                  channel.id === channelId
          )
        : undefined;

    const userId = Number(
        pathParts[2]
    );

    const user = isMe
        ? users.find(
              (user) =>
                  user.id === userId
          )
        : undefined;

    const groupUsers = group
        ? users.filter((user) =>
              group.memberIds.includes(
                  user.id
              )
          )
        : [];

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

    useEffect(() => {
        if (isMe && user) {
            addRecentUser(user.id);
        }
    }, [
        isMe,
        user,
        addRecentUser,
    ]);

    return (
        <>
            <div
                className={`sidebar ${
                    isMobileMenuOpen || isMePage
                        ? "sidebar--open"
                        : ""
                }`}
            >
                <GroupSidebar
                    isOpen={isMobileMenuOpen}
                />

                {isMe && (
                    <MeSidebar
                        users={users}
                        isOpen={isMobileMenuOpen}
                        onUserSelect={() =>
                            setIsMobileMenuOpen(
                                false
                            )
                        }
                    />
                )}

                {group && (
                    <ChatsSidebar
                        group={group}
                        users={users}
                        isOpen={isMobileMenuOpen}
                        onChannelSelect={() =>
                            setIsMobileMenuOpen(
                                false
                            )
                        }
                    />
                )}
            </div>

            <MessageSelectionProvider>
                <div
                    className={`chat-main ${
                        isMePage
                            ? "chat-main--me-page"
                            : ""
                    }`}
                >
                    {user && (
                        <Header
                            data={user}
                            onInfoClick={() =>
                                setIsInfoOpen(
                                    (prev) =>
                                        !prev
                                )
                            }
                            isMobileMenuOpen={
                                isMobileMenuOpen
                            }
                            setIsMobileMenuOpen={
                                setIsMobileMenuOpen
                            }
                        />
                    )}

                    {group && (
                        <Header
                            data={group}
                            channel={channel}
                            onInfoClick={() =>
                                setIsInfoOpen(
                                    (prev) =>
                                        !prev
                                )
                            }
                            isMobileMenuOpen={
                                isMobileMenuOpen
                            }
                            setIsMobileMenuOpen={
                                setIsMobileMenuOpen
                            }
                        />
                    )}

                    <div className="chat-wrapper">
                        {children}
                    </div>
                </div>
            </MessageSelectionProvider>

            <InfoSidebar
                isOpen={isInfoOpen}
                onClose={() =>
                    setIsInfoOpen(false)
                }
                groupUsers={groupUsers}
                description={
                    group?.description ?? ""
                }
                users={users}
                memberIds={
                    group?.memberIds ?? []
                }
                isGroup={Boolean(group)}
            />
        </>
    );
}