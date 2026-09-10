"use client";

import "./GroupSidebar.scss";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon } from "@/components/ui/Icon/Icon";
import { useGroups } from "@/context/GroupContext";
import { currentUserId } from "@/data/currentUser";

export const GroupSidebar = () => {
    const pathname = usePathname();
    const { groups } = useGroups();
    const myGroups = groups.filter((group) => group.memberIds.includes(currentUserId));
    return (
        <div className="group-sidebar">
            <div className="flex flex-col gap-4">
                <div className="group-sidebar__item">
                    <Link
                        href="/me"
                        className={`group-sidebar__link ${
                            pathname.startsWith("/me")
                                ? "group-sidebar__link--active"
                                : ""
                        }`}
                    >
                        <Icon name="zip" width={24} height={24} />
                    </Link>
                </div>
                <hr />
                <ul className="group-sidebar__list">
                    {myGroups.map((group) => (
                        <li className="group-sidebar__item" key={group.id}>
                            <Link
                                href={`/${group.id}/general`}
                                title={group.name}
                                className={`group-sidebar__link ${
                                    pathname.startsWith(
                                        `/${group.id}/`
                                    )
                                        ? "group-sidebar__link--active"
                                        : ""
                                }`}
                            >
                                {group.icon}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col">
                <ul className="group-sidebar__list group-sidebar__list--menu">
                    <li className="group-sidebar__item">
                        <Link href="#" className="group-sidebar__link group-sidebar__link--menu">
                            <Icon name="zip" width={24} height={24}/>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};