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
    isOpen: boolean;
    onUserSelect: () => void;
}

export const MeSidebar = ({
    users,
    isOpen,
    onUserSelect,
}: MeSidebarProps) => {
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
        <div
            className={`chats-sidebar me-sidebar ${
                isOpen
                    ? "me-sidebar--open"
                    : ""
            }`}
        >
            <div className="flex flex-col h-full">
                <div className="me-sidebar__mobile-head">
                    <button
                        type="button"
                        className="me-sidebar__mobile-search"
                    >
                        <Icon
                            name="search"
                            width={18}
                            height={18}
                        />
                    </button>

                    <button
                        type="button"
                        className="chats-sidebar__btn"
                        onClick={() =>
                            setIsNewGroupOpen(true)
                        }
                    >
                        <Icon
                            name="plus"
                            className="rotate-45"
                            width={16}
                            height={16}
                        />

                        <span>Создать беседу</span>
                    </button>
                </div>

                <button
                    type="button"
                    className="chats-sidebar__btn w-full mb-2 me-sidebar__desktop-create"
                    onClick={() =>
                        setIsNewGroupOpen(true)
                    }
                >
                    <Icon
                        name="plus"
                        className="rotate-45"
                        width={16}
                        height={16}
                    />

                    <span>Создать беседу</span>
                </button>

                <div className="chats-sidebar__messages me-sidebar__messages">
                    <div className="chats-sidebar__title-head me-sidebar__desktop-title">
                        <span>Недавние</span>
                    </div>

                    <UserList
                        users={users}
                        onUserSelect={onUserSelect}
                    />
                </div>

                <div className="me-sidebar__mobile-users">
                    <UserList
                        users={users}
                        onUserSelect={onUserSelect}
                    />
                </div>
            </div>

            <AddGroupModal
                isOpen={isNewGroupOpen}
                onClose={() =>
                    setIsNewGroupOpen(false)
                }
                users={users}
                onConfirm={createGroup}
            />
        </div>
    );
};