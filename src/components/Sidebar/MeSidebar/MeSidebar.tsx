"use client";

import "./MeSidebar.scss";

import { Icon } from "@/components/ui/Icon/Icon";
import type { User } from "@/types/user";

import { UserList } from "@/components/UserList/UserList";
import { useRecent } from "@/context/RecentContext";

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

    const recentUsers = recentUserIds
        .map((userId) =>
            users.find(
                (user) => user.id === userId
            )
        )
        .filter(
            (user): user is User =>
                Boolean(user)
        );

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
                </div>

                <div className="chats-sidebar__messages me-sidebar__messages">
                    <div className="chats-sidebar__title-head me-sidebar__desktop-title">
                        <span>Недавние</span>
                    </div>

                    <UserList
                        users={recentUsers}
                        onUserSelect={onUserSelect}
                    />
                </div>

                <div className="me-sidebar__mobile-users">
                    <UserList
                        users={recentUsers}
                        onUserSelect={onUserSelect}
                    />
                </div>
            </div>
        </div>
    );
};