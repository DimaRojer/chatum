"use client";

import "./GroupSidebar.scss";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Icon } from "@/components/ui/Icon/Icon";

import { useGroups } from "@/context/GroupContext";
import { useUser } from "@/context/UserContext";

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

    const { user: currentUser } =
        useUser();

    const [
        isLeaveModalOpen,
        setIsLeaveModalOpen,
    ] = useState(false);

    const [
        leaveGroupId,
        setLeaveGroupId,
    ] = useState<number | null>(null);

    const myGroups = currentUser
        ? groups.filter((group) =>
              group.memberIds.includes(
                  currentUser.id
              )
          )
        : [];

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
                                alt="Chatum"
                            />
                        </Link>
                    </div>

                    <hr />

                    <ul className="group-sidebar__list group-sidebar__list--group">
                        {myGroups.map(
                            (group) => {
                                const firstChannel =
                                    group.channels[0];

                                return (
                                    <ContextMenu
                                        key={
                                            group.id
                                        }
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
                                                href={
                                                    firstChannel
                                                        ? `/${group.id}/${firstChannel.id}`
                                                        : `/${group.id}`
                                                }
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
                                );
                            }
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
                isOpen={
                    isLeaveModalOpen
                }
                onClose={() => {
                    setIsLeaveModalOpen(
                        false
                    );
                    setLeaveGroupId(
                        null
                    );
                }}
                onConfirm={() => {
                    if (
                        leaveGroupId ===
                        null
                    ) {
                        return;
                    }

                    leaveGroup(
                        leaveGroupId
                    );

                    router.push("/me");

                    setIsLeaveModalOpen(
                        false
                    );
                    setLeaveGroupId(
                        null
                    );
                }}
                title="Вы точно хотите выйти из беседы?"
                description="После выхода вы больше не сможете отправлять сообщения в этой беседе."
                confirmText="Выйти"
                cancelText="Отмена"
            />
        </>
    );
};