"use client";

import "./SearchList.scss";

import Image from "next/image";
import { useState } from "react";

import { Icon } from "@/components/ui/Icon/Icon";
import { Search } from "@/components/ui/Search/Search";
import { AddGroupModal } from "@/components/ui/Modal/AddGroupModal/AddGroupModal";
import { Filter } from "@/components/ui/Filter/Filter";
import { MessageList } from "@/components/me/MessageList/MessageList";

import { useGroups } from "@/context/GroupContext";

import type { User } from "@/types/user";
import type { SearchMessage } from "@/types/search-message";

interface SearchListItem {
    id: string;
    icon: string;
    title: string;
    description: string;
    onClick?: () => void;
}

interface SearchListProps {
    users: User[];
    messages: SearchMessage[];
    onSearchOpen: (isOpen: boolean) => void;
}

export const SearchList = ({
    users,
    messages,
    onSearchOpen,
}: SearchListProps) => {
    const { createGroup } = useGroups();

    const [filter, setFilter] =
        useState("all");

    const [isSearchOpen, setIsSearchOpen] =
        useState(false);

    const [search, setSearch] =
        useState("");

    const [isNewGroupOpen, setIsNewGroupOpen] =
        useState(false);

    const searchItems: SearchListItem[] = [
        {
            id: "new-dialog",
            icon: "/icons/new-direct.svg",
            title: "Новый диалог",
            description:
                "Быстро начать разговор и перейти к новому диалогу",
            onClick: () => {},
        },
        {
            id: "find-user",
            icon: "/icons/find-user.svg",
            title: "Найти сообщение",
            description:
                "Поиск сообщений, отправленных вами или другими пользователями",
            onClick: () => {
                setIsSearchOpen(true);
                onSearchOpen(true);
            },
        },
        {
            id: "create-channel",
            icon: "/icons/create-group.svg",
            title: "Создать группу",
            description:
                "Создать группу для общения и дальнейшей работы",
            onClick: () =>
                setIsNewGroupOpen(true),
        },
    ];

    const normalizedSearch =
        search.trim().toLowerCase();

    const filteredMessages =
        messages
            .filter((item) => {
                if (filter === "groups") {
                    return item.type === "group";
                }

                if (filter === "people") {
                    return item.type === "people";
                }

                return true;
            })
            .filter((item) =>
                item.message.text
                    .toLowerCase()
                    .includes(normalizedSearch)
            )
            .sort(
                (a, b) =>
                    b.message.id -
                    a.message.id
            );

    if (isSearchOpen) {
        return (
            <>
                <div className="search-list__search">
                    <button
                        type="button"
                        onClick={() => {
                            setIsSearchOpen(false);
                            setSearch("");
                            setFilter("all");
                            onSearchOpen(false);
                        }}
                    >
                        <Icon
                            name="arrow"
                            width={20}
                            height={20}
                            className="rotate-180"
                        />
                    </button>

                    <Search
                        value={search}
                        onChange={setSearch}
                    />

                    <Filter
                        value={filter}
                        onChange={setFilter}
                    />
                </div>

                <div className="search-list__results">
                    {search.length > 0 &&
                        filteredMessages.length > 0 && (
                            <MessageList
                                messages={filteredMessages}
                                users={users}
                            />
                        )}

                    {search.length > 0 &&
                        filteredMessages.length === 0 && (
                            <div className="search-list__empty">
                                Сообщения не найдены
                            </div>
                        )}
                </div>
            </>
        );
    }

    return (
        <>
            <div className="search-list">
                {searchItems.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        className="search-list__item"
                        onClick={item.onClick}
                    >
                        <div className="search-list__icon-wrapper">
                            <Image
                                src={item.icon}
                                width={72}
                                height={72}
                                alt={item.title}
                                loading="eager"
                            />
                        </div>

                        <div className="search-list__content">
                            <div className="search-list__title">
                                {item.title}
                            </div>

                            <div className="search-list__descr">
                                {item.description}
                            </div>
                        </div>

                        <Icon
                            name="arrow"
                            className="search-list__arrow"
                        />
                    </button>
                ))}
            </div>

            <AddGroupModal
                isOpen={isNewGroupOpen}
                onClose={() =>
                    setIsNewGroupOpen(false)
                }
                users={users}
                onConfirm={createGroup}
            />
        </>
    );
};