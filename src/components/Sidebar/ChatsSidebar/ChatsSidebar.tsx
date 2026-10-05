"use client";

import "./ChatsSidebar.scss";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import type { Group } from "@/types/group";
import type { User } from "@/types/user";

import { useUser } from "@/context/UserContext";
import { useGroups } from "@/context/GroupContext";

import { AddChannelModal } from "@/components/ui/Modal/AddChatModal/AddChatModal";
import { Icon } from "@/components/ui/Icon/Icon";
import { UserList } from "@/components/UserList/UserList";
import { ContextMenu } from "@/components/ui/ContextMenu/ContextMenu";
import { RemoveModal } from "@/components/ui/Modal/RemoveModal/RemoveModal";

interface ChatsSidebarProps {
    group: Group;
    users: User[];
    isOpen: boolean;
    onChannelSelect: () => void;
}

export const ChatsSidebar = ({
    group,
    users,
    isOpen,
    onChannelSelect,
}: ChatsSidebarProps) => {
    const pathname = usePathname();

    const { user: currentUser } =
        useUser();

    const [isNewChannelOpen, setIsNewChannelOpen] =
        useState(false);

    const [channelToDelete, setChannelToDelete] =
        useState<number | null>(null);

    const {
        createChannel,
        deleteChannel,
    } = useGroups();

    const canManageChannel =
        currentUser
            ? group.owner ===
                  currentUser.id ||
              group.admin?.includes(
                  currentUser.id
              )
            : false;

    const groupUsers = users.filter(
        (user) =>
            group.memberIds.includes(
                user.id
            ) &&
            user.status === "online"
    );

    const countUsersOnline =
        groupUsers.length;

    const channelToDeleteData =
        group.channels.find(
            (channel) =>
                channel.id ===
                channelToDelete
        );

    return (
        <div
            className={`chats-sidebar ${
                isOpen
                    ? "chats-sidebar--open"
                    : ""
            }`}
        >
            <div className="flex flex-col h-full">
                <div className="chats-sidebar__channels">
                    <div className="chats-sidebar__title-head">
                        <span className="flex justify-between">
                            Список чатов
                        </span>

                        {currentUser &&
                            group.owner ===
                                currentUser.id && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsNewChannelOpen(
                                            true
                                        )
                                    }
                                >
                                    <Icon
                                        name="plus"
                                        className="rotate-45"
                                        width={16}
                                        height={16}
                                    />
                                </button>
                            )}
                    </div>

                    <ul className="channels-list">
                        {group.channels.map(
                            (channel) => {
                                const href =
                                    `/${group.id}/${channel.id}`;

                                return (
                                    <li
                                        className="channels-list__item"
                                        key={
                                            channel.id
                                        }
                                    >
                                        {canManageChannel ? (
                                            <ContextMenu
                                                menu={
                                                    <>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                console.log(
                                                                    "Переименовать",
                                                                    channel.id
                                                                );
                                                            }}
                                                        >
                                                            Переименовать
                                                        </button>

                                                        {channel.name !==
                                                            "general" && (
                                                            <button
                                                                type="button"
                                                                className="context-menu__item--danger"
                                                                onClick={() => {
                                                                    setChannelToDelete(
                                                                        channel.id
                                                                    );
                                                                }}
                                                            >
                                                                Удалить
                                                            </button>
                                                        )}
                                                    </>
                                                }
                                            >
                                                <Link
                                                    href={
                                                        href
                                                    }
                                                    onClick={
                                                        onChannelSelect
                                                    }
                                                    className={`channels-list__link ${
                                                        pathname ===
                                                        href
                                                            ? "channels-list__link--active"
                                                            : ""
                                                    }`}
                                                >
                                                    <span className="channels-list__name">
                                                        {
                                                            channel.name
                                                        }
                                                    </span>

                                                    {channel.unreadCount >
                                                        0 && (
                                                        <span className="badge-count">
                                                            {
                                                                channel.unreadCount
                                                            }
                                                        </span>
                                                    )}
                                                </Link>
                                            </ContextMenu>
                                        ) : (
                                            <Link
                                                href={
                                                    href
                                                }
                                                onClick={
                                                    onChannelSelect
                                                }
                                                className={`channels-list__link ${
                                                    pathname ===
                                                    href
                                                        ? "channels-list__link--active"
                                                        : ""
                                                }`}
                                            >
                                                <span className="channels-list__name">
                                                    {
                                                        channel.name
                                                    }
                                                </span>

                                                {channel.unreadCount >
                                                    0 && (
                                                    <span className="badge-count">
                                                        {
                                                            channel.unreadCount
                                                        }
                                                    </span>
                                                )}
                                            </Link>
                                        )}
                                    </li>
                                );
                            }
                        )}
                    </ul>
                </div>

                <div className="chats-sidebar__messages">
                    <div className="chats-sidebar__title-head">
                        <span>
                            Онлайн (
                            {
                                countUsersOnline
                            }
                            )
                        </span>
                    </div>

                    <UserList
                        key={group.id}
                        users={groupUsers}
                        variant="group"
                        onUserSelect={
                            onChannelSelect
                        }
                    />
                </div>
            </div>

            <AddChannelModal
                isOpen={
                    isNewChannelOpen
                }
                onClose={() =>
                    setIsNewChannelOpen(
                        false
                    )
                }
                channels={
                    group.channels
                }
                onConfirm={(name) => {
                    createChannel(
                        group.id,
                        name
                    );
                }}
            />

            <RemoveModal
                isOpen={
                    channelToDelete !==
                    null
                }
                onClose={() =>
                    setChannelToDelete(
                        null
                    )
                }
                onConfirm={() => {
                    if (
                        channelToDelete ===
                        null
                    ) {
                        return;
                    }

                    deleteChannel(
                        group.id,
                        channelToDelete
                    );

                    setChannelToDelete(
                        null
                    );
                }}
                title={`Вы уверены, что хотите удалить канал «${channelToDeleteData?.name}»?`}
                confirmText="Удалить"
                cancelText="Отмена"
            />
        </div>
    );
};