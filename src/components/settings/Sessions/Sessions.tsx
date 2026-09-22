"use client";

import "./Sessions.scss";

import { Btn } from "@/components/ui/Btn/Btn";

interface Session {
    id: number;
    device: string;
    browser: string;
    location: string;
    ip: string;
    lastActive: string;
    current: boolean;
}

const sessions: Session[] = [
    {
        id: 1,
        device: "Windows PC",
        browser: "Chrome",
        location: "Москва, Россия",
        ip: "192.168.1.10",
        lastActive: "Сейчас",
        current: true,
    },
    {
        id: 2,
        device: "iPhone 15",
        browser: "Safari",
        location: "Москва, Россия",
        ip: "192.168.1.24",
        lastActive: "2 часа назад",
        current: false,
    },
    {
        id: 3,
        device: "MacBook Pro",
        browser: "Chrome",
        location: "Санкт-Петербург, Россия",
        ip: "192.168.1.35",
        lastActive: "3 дня назад",
        current: false,
    },
];

export const Sessions = () => {
    const handleLogout = (id: number) => {
        console.log("Завершить сессию:", id);
    };

    return (
        <section className="sessions">
            <div className="sessions__head">
                <div>
                    <h2 className="sessions__title">Активные сессии</h2>
                    <p className="sessions__description"> Управление устройствами, на которых выполнен вход в ваш аккаунт.</p>
                </div>
            </div>
            <div className="sessions__list">
                {sessions.map((session) => (
                    <div className="sessions__item" key={session.id}>
                        <div className="sessions__info">
                            <div className="sessions__device">
                                <span>{session.device}</span>
                                {session.current && (
                                    <span className="sessions__current">Текущее устройство</span>
                                )}
                            </div>
                            <div className="sessions__meta">
                                <span>{session.browser}</span>
                                <span>{session.location}</span>
                                <span>{session.ip}</span>
                                <span>{session.lastActive}</span>
                            </div>
                        </div>
                        {!session.current && (
                            <Btn
                                variant="transparent"
                                type="button"
                                onClick={() =>
                                    handleLogout(session.id)
                                }
                            >
                                Завершить
                            </Btn>
                        )}
                    </div>
                ))}
            </div>

            <div className="sessions__footer">
                <Btn
                    variant="red"
                    type="button"
                    onClick={() => console.log("Завершить все сессии")}>
                    Завершить все остальные
                </Btn>
            </div>
        </section>
    );
};