"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { UserProvider } from "@/context/UserContext";
import { SettingsSidebar } from "@/components/Sidebar/SettingsSidebar/SettingsSidebar";
import { Btn } from "@/components/ui/Btn/Btn";
import { Icon } from "@/components/ui/Icon/Icon";

const settingsTitles: Record<string, string> = {
    "/settings/profile": "Профиль",
    "/settings/account": "Аккаунт",
    "/settings/notifications": "Уведомления",
    "/settings/appearance": "Внешний вид",
    "/settings/language": "Язык",
};

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();

    const [isMobileMenuOpen, setIsMobileMenuOpen] =
        useState(false);

    const isSettingsRoot = pathname === "/settings";
    const title = settingsTitles[pathname] ?? "Настройки";

    return (
        <UserProvider>
            <header className="header flex items-center">
                {isSettingsRoot ? (
                <button
                    type="button"
                    className="block md:hidden"
                    onClick={() => router.push("/me")}
                >
                    <Icon name="arrow" />
                </button>
                ) : (
                    <Link
                        href="/settings"
                        className="block md:hidden"
                    >
                        <Icon name="arrow" />
                    </Link>
                )}

                <h1 className="head__title">
                    <span className="hidden md:block">
                        Настройки
                    </span>

                    <span className="block md:hidden">
                        {title}
                    </span>
                </h1>
            </header>

            <div className="page-wrapper">
                <SettingsSidebar
                    isOpen={isMobileMenuOpen}
                    onClose={() =>
                        setIsMobileMenuOpen(false)
                    }
                />

                {!isSettingsRoot && (
                    <form className="form-settings">
                        <div className="page-content settings">
                            <div className="settings__body">
                                {children}
                            </div>

                            <div className="settings__footer">
                                <Btn type="submit">
                                    Сохранить
                                </Btn>

                                <Btn variant="transparent">
                                    Отмена
                                </Btn>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </UserProvider>
    );
}