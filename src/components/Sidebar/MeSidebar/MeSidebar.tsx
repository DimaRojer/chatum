"use client";

import "./MeSidebar.scss";

import { useState } from "react";

import { Icon } from "@/components/ui/Icon/Icon";
import type { User } from "@/types/user";

import { UserList } from "@/components/UserList/UserList";
import { useRecent } from "@/context/RecentContext";
import { useGroups } from "@/context/GroupContext";

import { AddGroupModal } from "@/components/ui/Modal/AddGroupModal/AddGroupModal";

interface MeSidebarProps {
    users: User[];
}

export const MeSidebar = ({ users }: MeSidebarProps) => {
    const { recentUserIds } = useRecent();
    const { createGroup } = useGroups();

    const [isNewGroupOpen, setIsNewGroupOpen] =
        useState(false);

    const recentUsers = recentUserIds
        .map((userId) =>
            users.find((user) => user.id === userId)
        )
        .filter((user): user is User => Boolean(user));

    return (
        <div className="chats-sidebar me-sidebar">
            <div className="flex flex-col h-full">
                <button type="button" className="chats-sidebar__btn w-full mb-2" onClick={() => setIsNewGroupOpen(true)}>
                    <Icon name="plus" className="rotate-45" width={16} height={16}/>
                    <span>Создать беседу</span>
                </button>
                <div className="chats-sidebar__messages">
                    <div className="chats-sidebar__title-head">
                        <span>Недавние</span>
                    </div>
                    <UserList users={recentUsers} />
                </div>
            </div>
            <AddGroupModal
                isOpen={isNewGroupOpen}
                onClose={() => setIsNewGroupOpen(false)}
                users={users}
                onConfirm={createGroup}
            />
        </div>
    );
};