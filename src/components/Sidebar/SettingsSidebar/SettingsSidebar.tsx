"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import "./SettingsSidebar.scss";

const settingsItems = [
    { title: "Профиль", href: "/profile" },
    { title: "Аккаунт", href: "/account" },
    { title: "Уведомления", href: "/notifications" },
    { title: "Внешний вид", href: "/appearance" },
    { title: "Язык", href: "/language" },
];
interface SettingsSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}
export const SettingsSidebar = ({
    isOpen,
    onClose,
}: SettingsSidebarProps) => {
    const pathname = usePathname();

    const isSettingsRoot = pathname === "/settings";

    return (
        <aside
            className={`settings-sidebar ${
                isOpen
                    ? "settings-sidebar--open"
                    : ""
            }`}
        >
            <nav className="settings-sidebar__nav">
                <ul className="settings-sidebar__list">
                    {settingsItems.map((item) => {
                        const href = `/settings${item.href}`;

                        return (
                            <li
                                className="settings-sidebar__item"
                                key={item.href}
                            >
                                <Link
                                    href={href}
                                    onClick={onClose}
                                    className={`settings-sidebar__link ${
                                        pathname === href
                                            ? "settings-sidebar__link--active"
                                            : ""
                                    }`}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};