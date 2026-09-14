"use client";
import { useEffect, useRef } from "react";

import type { Group } from "@/types/group";
import type { Channel } from "@/types/channel";
import type { User } from "@/types/user";
import { Icon } from "@/components/ui/Icon/Icon";
import "./Header.scss"

interface HeadProps {
    data: Group | User;
    channel?: Channel;
    onInfoClick: () => void;
}

export const Header = ({ data, channel, onInfoClick }: HeadProps) => {
    const searchRef = useRef<HTMLInputElement>(null);
    const isUser = "status" in data;
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                (event.ctrlKey || event.metaKey) && event.code === "KeyF"
            ) {
                event.preventDefault();
                event.stopPropagation();
                searchRef.current?.focus();
            }
        };
        
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <header className="header">
            <div className="head">
                <div className="flex flex-col leading-none gap-1">
                    <h1 className="head__title">{data.name}</h1>
                    <div className="flex">
                        <h2 className="head__description">
                            {"status" in data ? data.description : channel?.name}
                        </h2>
                        {!isUser && (
                        <div className="head__members">
                            <Icon name="users" width={16} height={16} />
                            <span className="head__members-count">{data.memberIds.length} members</span>
                        </div>
                        )}
                    </div>
                </div>
                <div className="flex gap-4 head__btns">
                    <div className="head__search">
                        <input ref={searchRef} type="text" placeholder="Ctrl+F"/>
                        <button type="button">
                            <Icon name="search" width={18} height={18}/>
                        </button>
                    </div>
                    <button className="btn-svg" type="button" onClick={onInfoClick}>
                        <Icon name="info" width={18} height={18} />
                    </button>
                </div>
            </div>
        </header>
    );
};