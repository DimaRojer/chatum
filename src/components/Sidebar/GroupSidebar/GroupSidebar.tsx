"use client";

import "./GroupSidebar.scss";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Icon } from "@/components/ui/Icon/Icon";

import { useGroups } from "@/context/GroupContext";
import { currentUserId } from "@/data/currentUser";

import { ContextMenu } from "@/components/ui/ContextMenu/ContextMenu";
import { RemoveModal } from "@/components/ui/Modal/RemoveModal/RemoveModal";

interface GroupSidebarProps { 
    isOpen: boolean; 
}

export const GroupSidebar = ({
    isOpen,
}: GroupSidebarProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const {
        groups,
        leaveGroup,
    } = useGroups();

    const [
        isLeaveModalOpen,
        setIsLeaveModalOpen,
    ] = useState(false);

    const [
        leaveGroupId,
        setLeaveGroupId,
    ] = useState<string | null>(null);

    const myGroups = groups.filter(
        (group) =>
            group.memberIds.includes(
                currentUserId
            )
    );

    return (
        <>
            <div className="group-sidebar">
                <div className="flex flex-col gap-4">
                    <div className="group-sidebar__item">
                        <Link
                            href="/me"
                            className={`group-sidebar__link ${
                                pathname.startsWith(
                                    "/me"
                                )
                                    ? "group-sidebar__link--active"
                                    : ""
                            }`}
                        >
                            <img
                                src="/icons/logo-white.svg"
                                width={24}
                                height={24}
                            />
                        </Link>
                    </div>

                    <hr />

                    <ul className="group-sidebar__list group-sidebar__list--group">
                        {myGroups.map(
                            (group) => (
                                <ContextMenu
                                    key={group.id}
                                    menu={
                                        <>
                                            <button type="button">
                                                Настройки группы
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setLeaveGroupId(
                                                        group.id
                                                    );
                                                    setIsLeaveModalOpen(
                                                        true
                                                    );
                                                }}
                                            >
                                                Выйти из группы
                                            </button>
                                        </>
                                    }
                                >
                                    <li className="group-sidebar__item">
                                        <Link
                                            href={`/${group.id}/general`}
                                            title={
                                                group.name
                                            }
                                            className={`group-sidebar__link ${
                                                pathname.startsWith(
                                                    `/${group.id}/`
                                                )
                                                    ? "group-sidebar__link--active"
                                                    : ""
                                            }`}
                                        >
                                            {
                                                group.icon
                                            }
                                        </Link>
                                    </li>
                                </ContextMenu>
                            )
                        )}
                    </ul>
                </div>

                <div className="flex flex-col">
                    <ul className="group-sidebar__list group-sidebar__list--menu">
                        <li className="group-sidebar__item">
                            <Link
                                href="/settings"
                                className="group-sidebar__link group-sidebar__link--menu"
                            >
                                <Icon
                                    name="settings"
                                    width={24}
                                    height={24}
                                />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <RemoveModal
                isOpen={isLeaveModalOpen}
                onClose={() => {
                    setIsLeaveModalOpen(false);
                    setLeaveGroupId(null);
                }}
                onConfirm={() => {
                    if (!leaveGroupId) return;

                    leaveGroup(leaveGroupId);
                    router.push("/me");

                    setIsLeaveModalOpen(false);
                    setLeaveGroupId(null);
                }}
                title="Вы точно хотите выйти из беседы?"
                description="После выхода вы больше не сможете отправлять сообщения в этой беседе."
                confirmText="Выйти"
                cancelText="Отмена"
            />
        </>
    );
};