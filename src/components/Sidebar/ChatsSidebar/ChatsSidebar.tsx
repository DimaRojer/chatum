"use client";

import "./ChatsSidebar.scss";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Group } from "@/types/group";
import type { User } from "@/types/user";

import { AddChannelModal } from "@/components/ui/Modal/AddChatModal/AddChatModal";
import { Search } from "@/components/ui/Search/Search";
import { Icon } from "@/components/ui/Icon/Icon";
import { UserList } from "@/components/UserList/UserList";
import { useGroups } from "@/context/GroupContext";
interface ChatsSidebarProps {
    group: Group;
    users: User[];
    search: string;
    setSearch: (value: string) => void;
}

export const ChatsSidebar = ({ group, users, setSearch, search }: ChatsSidebarProps) => {
    const pathname = usePathname();
    const [isNewChannelOpen, setIsNewChannelOpen] = useState(false);
    const { createChannel } = useGroups();
    const groupUsers = users.filter((user) => group.memberIds.includes(user.id) && user.status === "online");
    const countUsersOnline = groupUsers.length;

    return (
        <div className="chats-sidebar">
            <div className="flex flex-col h-full">
                <Search value={search} onChange={setSearch}/>
                <div className="chats-sidebar__channels">
                    <div className="chats-sidebar__title-head mt-6">
                        <span>Список чатов</span>
                        <button type="button" onClick={() => setIsNewChannelOpen(true)}>
                            <Icon name="plus" className="rotate-45" width={16} height={16}/>
                        </button>
                    </div>
                    <ul className="channels-list">
                        {group.channels.map((channel) => (
                            <li className="channels-list__item" key={channel.id}>
                                <Link
                                    href={`/${group.id}/${channel.id}`}
                                    className={`channels-list__link ${
                                        pathname ===
                                        `/${group.id}/${channel.id}`
                                            ? "channels-list__link--active"
                                            : ""
                                    }`}
                                >
                                    <span className="channels-list__name">{channel.name}</span>
                                    {channel.unreadCount > 0 && (
                                        <span className="badge-count">{channel.unreadCount}</span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="chats-sidebar__messages">
                    <div className="chats-sidebar__title-head">
                        <span>Онлайн ({countUsersOnline})</span>
                    </div>
                    <UserList key={group.id} users={groupUsers} variant="group"/>
                </div>
            </div>
            <AddChannelModal
                isOpen={isNewChannelOpen}
                onClose={() => setIsNewChannelOpen(false)}
                channels={group.channels}
                onConfirm={(name) => {
                    createChannel(group.id, name);
                }}
            />
        </div>
    );
};