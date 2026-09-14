"use client";

import { GroupsProvider } from "@/context/GroupContext";
import { RecentProvider } from "@/context/RecentContext";

import { GroupSidebar } from "@/components/Sidebar/GroupSidebar/GroupSidebar";
import ChatLayout from "@/layouts/ChatLayout";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <GroupsProvider>
            <RecentProvider>
                <div className="chat-layout">
                    <GroupSidebar />
                    <ChatLayout>
                        {children}
                    </ChatLayout>
                </div>
            </RecentProvider>
        </GroupsProvider>
    );
}