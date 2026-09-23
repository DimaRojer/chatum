"use client";

import { useEffect, useRef, useState } from "react";
import type { Group } from "@/types/group";
import type { Channel } from "@/types/channel";
import type { User } from "@/types/user";
import { Icon } from "@/components/ui/Icon/Icon";
import { useMessageSelection } from "@/context/MessageSelectionContext";

import "./Header.scss";

interface HeadProps {
    data: Group | User;
    channel?: Channel;
    onInfoClick: () => void;
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: ( value: boolean) => void;
}

export const Header = ({
    data,
    channel,
    onInfoClick,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
}: HeadProps) => {
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);
    const { selectedMessageId, clearSelection,} = useMessageSelection();
    const isUser = "status" in data;
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ( (event.ctrlKey || event.metaKey) && event.code === "KeyF") {
                event.preventDefault();
                event.stopPropagation();
                searchRef.current?.focus();
            }
        };
        window.addEventListener( "keydown", handleKeyDown);
        return () => {
            window.removeEventListener( "keydown", handleKeyDown);
        };
    }, []);
    if (selectedMessageId !== null) {
        return (
            <header className="header">
                <div className="head">
                    <div className="flex gap-2">
                        <button type="button" className="btn-svg" onClick={clearSelection}>
                            <Icon name="close" width={20} height={20}/>
                        </button>
                        <span> 1</span>
                    </div>
                    <div className="flex gap-4">
                        <button type="button" className="btn-svg">
                            <Icon name="trash" width={20} height={20}/>
                        </button>
                    </div>
                </div>
            </header>
        );
    }
    return (
        <header className="header">
            <div className="head">
                {!isMobileSearchOpen && (
                    <div className="flex gap-2">
                        <button
                            type="button"
                            className={`mobile-menu-toggle ${
                                isMobileMenuOpen
                                    ? "mobile-menu-toggle--open"
                                    : ""
                            }`}
                            onClick={() => setIsMobileMenuOpen( !isMobileMenuOpen)}
                        >
                            <Icon name="home" width={24} height={24}/>
                        </button>
                        <div className="flex flex-col leading-none gap-1">
                            <h1 className="head__title">{data.name}</h1>
                            <div className="flex">
                                <h2 className="head__description">
                                    {"status" in data
                                        ? data.description
                                        : channel?.name}
                                </h2>
                                {!isUser && (
                                    <div className="head__members">
                                        <Icon name="users" width={16} height={16}/>
                                        <span className="head__members-count"> {data.memberIds.length} members</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex gap-4 head__btns">
                    <div
                        className={`head__search ${
                            isMobileSearchOpen
                                ? "head__search--mobile"
                                : ""
                        }`}
                    >
                        <input
                            ref={searchRef}
                            type="text"
                            placeholder={
                                isMobileSearchOpen
                                    ? "Поиск"
                                    : "Ctrl+F"
                            }
                            autoFocus={
                                isMobileSearchOpen
                            }
                        />

                        <button
                            type="button"
                            onClick={() => {
                                if ( isMobileSearchOpen) setIsMobileSearchOpen(false);
                            }}
                        >
                            <Icon
                                name={ isMobileSearchOpen ? "close": "search"}
                                width={18}
                                height={18}
                            />
                        </button>
                    </div>

                    <button
                        type="button"
                        className="head__search-btn"
                        onClick={() => setIsMobileSearchOpen(true)}
                    >
                        <Icon name="search" width={18} height={18}/>
                    </button>

                    <button className="btn-svg" type="button" onClick={onInfoClick}>
                        <Icon name="info" width={18} height={18}/>
                    </button>
                </div>
            </div>
        </header>
    );
};