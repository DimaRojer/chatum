"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { users } from "@/data/users";
import { MeSidebar } from "@/components/Sidebar/MeSidebar/MeSidebar";
import { ChatsSidebar } from "@/components/Sidebar/ChatsSidebar/ChatsSidebar";
import { Header } from "@/components/chat/Header/Header";
import { InfoSidebar } from "@/components/Sidebar/InfoSidebar/InfoSidebar";
import { useGroups } from "@/context/GroupContext";
import { useRecent } from "@/context/RecentContext";

export default function ChatLayout({ children,}: { children: React.ReactNode;}) {
    const pathname = usePathname();
    const { groups } = useGroups();
    const { addRecentUser } = useRecent();
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [search, setSearch] = useState("");
    const isMe = pathname.startsWith("/me");
    const userId = Number(pathname.split("/")[2]);
    const user = users.find( (user) => user.id === userId);
    const groupId = pathname.split("/")[1];
    const group = groups.find((group) => group.id === groupId);
    const groupUsers = group ? users.filter((user) => group.memberIds.includes(user.id) ): [];
    const channelId = pathname.split("/")[2];
    const channel = group?.channels.find((channel) => channel.id === channelId);
    useEffect(() => {
        if (isMe && user) {
            addRecentUser(user.id);
        }
    }, [isMe, user]);

    return (
        <>
            {isMe && (
                <MeSidebar users={users}/>
            )}
            {group && (
                <ChatsSidebar group={group} users={users} search={search} setSearch={setSearch}/>
            )}
            <div className="chat-main">
                {user && (
                    <Header data={user} onInfoClick={() =>setIsInfoOpen((prev) => !prev)}/>
                )}
                {group && (
                    <Header channel={channel} data={group} onInfoClick={() => setIsInfoOpen((prev) => !prev)}/>
                )}
                <div className="chat-wrapper">{children}</div>
            </div>
            <InfoSidebar isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)}groupUsers={groupUsers} description={group?.description ?? ""}/>
        </>
    );
}