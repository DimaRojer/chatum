"use client";

import "./Sessions.scss";

import { useState } from "react";

import { useUser } from "@/context/UserContext";

import { Btn } from "@/components/ui/Btn/Btn";
import { RemoveModal } from "@/components/ui/Modal/RemoveModal/RemoveModal";

export const Sessions = () => {
    const { user, updateUser, logout } = useUser();

    const [selectedSessionId, setSelectedSessionId] =
        useState<number | null>(null);

    const [isRemoveOpen, setIsRemoveOpen] =
        useState(false);

    const [isRemoveAllOpen, setIsRemoveAllOpen] =
        useState(false);

    if (!user) {
        return null;
    }

    const selectedSession = user.sessions.find(
        (session) =>
            session.id === selectedSessionId
    );

    const handleLogout = (id: number) => {
        setSelectedSessionId(id);
        setIsRemoveOpen(true);
    };

    const handleConfirmLogout = () => {
        if (selectedSessionId === null) {
            return;
        }

        updateUser({
            sessions: user.sessions.filter(
                (session) =>
                    session.id !== selectedSessionId
            ),
        });

        setSelectedSessionId(null);
        setIsRemoveOpen(false);
    };

    return (
        <section className="sessions">
            <div className="sessions__head">
                <div>
                    <h2 className="sessions__title">
                        Активные сессии
                    </h2>

                    <p className="sessions__description">
                        Управление устройствами, на которых
                        выполнен вход в ваш аккаунт.
                    </p>
                </div>
            </div>

            <div className="sessions__list">
                {user.sessions.map((session) => (
                    <div
                        className="sessions__item"
                        key={session.id}
                    >
                        <div className="sessions__info">
                            <div className="sessions__device">
                                <span>
                                    {session.device}
                                </span>

                                {session.current && (
                                    <span className="sessions__current">
                                        Текущее устройство
                                    </span>
                                )}
                            </div>

                            <div className="sessions__meta">
                                <span>
                                    {session.browser}
                                </span>

                                <span>
                                    {session.location}
                                </span>

                                <span>
                                    {session.ip}
                                </span>

                                <span>
                                    {session.lastActive}
                                </span>
                            </div>
                        </div>

                        {!session.current && (
                            <Btn
                                variant="transparent"
                                type="button"
                                onClick={() =>
                                    handleLogout(
                                        session.id
                                    )
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
                    onClick={() =>
                        setIsRemoveAllOpen(true)
                    }
                >
                    Выйти
                </Btn>
            </div>

            <RemoveModal
                isOpen={isRemoveOpen}
                onClose={() => {
                    setIsRemoveOpen(false);
                    setSelectedSessionId(null);
                }}
                onConfirm={handleConfirmLogout}
                title={`Завершить сессию ${
                    selectedSession?.device ?? ""
                }?`}
                confirmText="Завершить"
                cancelText="Отмена"
            />

            <RemoveModal
                isOpen={isRemoveAllOpen}
                onClose={() =>
                    setIsRemoveAllOpen(false)
                }
                onConfirm={() => {
                    setIsRemoveAllOpen(false);
                    logout();
                }}
                title="Выйти из аккаунта?"
                confirmText="Выйти"
                cancelText="Отмена"
            />
        </section>
    );
};