"use client";

import { useState } from "react";

import { UserProvider } from "@/context/UserContext";
import { GroupsProvider } from "@/context/GroupContext";
import { RecentProvider } from "@/context/RecentContext";
import ChatLayout from "@/layouts/ChatLayout";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] =
        useState(false);

    return (
        <UserProvider>
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
        </UserProvider>
    );
}