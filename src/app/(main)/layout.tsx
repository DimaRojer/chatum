"use client";

import { useState } from "react";

import { GroupsProvider } from "@/context/GroupContext";
import { RecentProvider } from "@/context/RecentContext";

import { GroupSidebar } from "@/components/Sidebar/GroupSidebar/GroupSidebar";
import ChatLayout from "@/layouts/ChatLayout";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] =
        useState(false);

    return (
        <GroupsProvider>
            <RecentProvider>
                <div className="chat-layout">
                    <ChatLayout
                        isMobileMenuOpen={
                            isMobileMenuOpen
                        }
                        setIsMobileMenuOpen={
                            setIsMobileMenuOpen
                        }
                    >
                        {children}
                    </ChatLayout>
                </div>
            </RecentProvider>
        </GroupsProvider>
    );
}