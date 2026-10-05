"use client";

import { useState } from "react";

import { UserList } from "@/components/UserList/UserList";
import { AddMembersModal } from "@/components/ui/Modal/AddMembersModal";
import { Icon } from "@/components/ui/Icon/Icon";

import type { User } from "@/types/user";

import "./InfoSidebar.scss";

interface InfoSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    groupUsers: User[];
    description: string;
    users: User[];
    memberIds: number[];
    isGroup: boolean;
}

export const InfoSidebar = ({
    isOpen,
    onClose,
    groupUsers,
    description,
    users,
    memberIds,
    isGroup,
}: InfoSidebarProps) => {
    const [isAddMembersOpen, setIsAddMembersOpen] =
        useState(false);

    return (
        <>
            <div
                className={`info-sidebar ${
                    isOpen
                        ? "info-sidebar--open"
                        : ""
                }`}
            >
                <div className="info-sidebar__header">
                    <div className="flex justify-between items-center p-4">
                        <h3>Info</h3>

                        <button
                            type="button"
                            className="btn-svg"
                            onClick={onClose}
                        >
                            <Icon
                                name="plus"
                                width={18}
                                height={18}
                            />
                        </button>
                    </div>
                </div>

                <div className="info-content">
                    <div className="info-content__block">
                        <h4 className="info-content__title">
                            About
                        </h4>

                        <div className="info-content__text">
                            {description}
                        </div>
                    </div>
                    {isGroup && (
                    <div className="info-content__block">
                        <h4 className="info-content__title">
                            Members ({groupUsers.length})

                            <button
                                type="button"
                                onClick={() =>
                                    setIsAddMembersOpen(true)
                                }
                            >
                                <Icon
                                    width={16}
                                    height={16}
                                    name="plus"
                                    className="rotate-45"
                                />
                            </button>
                        </h4>

                        <UserList
                            users={groupUsers}
                            variant="group"
                        />
                    </div>
                    )}
                    <div className="info-content__block">
                        <h4 className="info-content__title">
                            Shared Files
                        </h4>

                        <div className="info-content__text" />
                    </div>
                </div>
            </div>

            <AddMembersModal
                isOpen={isAddMembersOpen}
                onClose={() =>
                    setIsAddMembersOpen(false)
                }
                users={users}
                memberIds={memberIds}
            />
        </>
    );
};