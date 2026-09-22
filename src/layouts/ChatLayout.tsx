"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { users } from "@/data/users";

import { MeSidebar } from "@/components/Sidebar/MeSidebar/MeSidebar";
import { GroupSidebar } from "@/components/Sidebar/GroupSidebar/GroupSidebar";
import { ChatsSidebar } from "@/components/Sidebar/ChatsSidebar/ChatsSidebar";
import { Header } from "@/components/chat/Header/Header";
import { InfoSidebar } from "@/components/Sidebar/InfoSidebar/InfoSidebar";

import { useGroups } from "@/context/GroupContext";
import { useRecent } from "@/context/RecentContext";

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
    const isSettings = pathname.startsWith("/settings");

    const { groups } = useGroups();
    const { addRecentUser } = useRecent();

    const [isInfoOpen, setIsInfoOpen] =
        useState(false);

    const [search, setSearch] = useState("");

    const isMe = pathname.startsWith("/me");
    const isMePage = pathname === "/me";

    const userId = Number(
        pathname.split("/")[2]
    );

    const user = users.find(
        (user) => user.id === userId
    );

    const groupId = pathname.split("/")[1];

    const group = groups.find(
        (group) => group.id === groupId
    );

    const groupUsers = group
        ? users.filter((user) =>
              group.memberIds.includes(user.id)
          )
        : [];

    const channelId = pathname.split("/")[2];

    const channel = group?.channels.find(
        (channel) => channel.id === channelId
    );

    useEffect(() => {
        if (isMe && user) {
            addRecentUser(user.id);
        }
    }, [isMe, user, addRecentUser]);

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
                        onUserSelect={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {group && (
                    <ChatsSidebar
                        group={group}
                        users={users}
                        isOpen={isMobileMenuOpen}
                        onChannelSelect={() =>
                            setIsMobileMenuOpen(false)
                        }
                    />
                )}
            </div>

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
                                (prev) => !prev
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
                                (prev) => !prev
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

            <InfoSidebar
                isOpen={isInfoOpen}
                onClose={() =>
                    setIsInfoOpen(false)
                }
                groupUsers={groupUsers}
                description={
                    group?.description ?? ""
                }
            />
        </>
    );
}