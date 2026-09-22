"use client";

import { Btn } from "@/components/ui/Btn/Btn";
import { Field } from "@/components/ui/Field/Field";
import { Sessions } from "@/components/settings/Sessions/Sessions";

import { useUser } from "@/context/UserContext";

export default function AccountPage() {
    const {
        currentPassword,
        newPassword,
        confirmPassword,
        setCurrentPassword,
        setNewPassword,
        setConfirmPassword,
    } = useUser();

    return (
        <div className="flex flex-col gap-4">
            <section>
                <h2 className="settings__subtitle">
                    Смена пароля
                </h2>

                <div className="flex flex-col gap-4 my-4">
                    <Field
                        label="Текущий пароль"
                        type="password"
                        value={currentPassword}
                        onChange={setCurrentPassword}
                    />

                    <Field
                        label="Новый пароль"
                        type="password"
                        value={newPassword}
                        onChange={setNewPassword}
                    />

                    <Field
                        label="Подтвердите новый пароль"
                        type="password"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                    />
                </div>

                <Btn type="button">
                    Изменить пароль
                </Btn>
            </section>

            <section>
                <h2 className="settings__subtitle">
                    Двухфакторная аутентификация
                </h2>

                <p className="settings__description">
                    Дополнительная защита аккаунта
                </p>

                <div className="flex items-center gap-4 my-4">
                    <span>Статус: Выключена</span>

                    <Btn type="button">
                        Настроить
                    </Btn>
                </div>
            </section>

            <Sessions />

            <section className="settings__danger">
                <h2 className="settings__subtitle">
                    Опасная зона
                </h2>

                <p className="settings__description">
                    Удаление аккаунта необратимо. Все данные
                    аккаунта будут удалены.
                </p>

                <Btn
                    type="button"
                    variant="red"
                >
                    Удалить аккаунт
                </Btn>
            </section>
        </div>
        
    );
}