"use client";

import "./MeSidebar.scss";

import { Icon } from "@/components/ui/Icon/Icon";
import { Search } from "@/components/ui/Search/Search";
import type { User } from "@/types/user";

import { UserList } from "@/components/UserList/UserList";
import { useRecent } from "@/context/RecentContext";
interface MeSidebarProps {
    users: User[];
}

export const MeSidebar = ({ users }: MeSidebarProps) => {
    const { recentUserIds } = useRecent();
    const recentUsers = recentUserIds
        .map((userId) => users.find((user) => user.id === userId))
        .filter((user): user is User => Boolean(user));
    return (
        <div className="chats-sidebar me-sidebar">
            <div className="flex flex-col h-full">
                {/* <Search /> */}
                <div className="chats-sidebar__messages">
                    <div className="chats-sidebar__title-head">
                        <span>Недавние</span>
                    </div>
                    <UserList users={recentUsers}/>
                </div>
                <button className="chats-sidebar__btn w-full">
                    <Icon name="plus" className="rotate-45" width={16} height={16}/>
                    <span>Create new</span>
                </button>
            </div>
        </div>
    );
};