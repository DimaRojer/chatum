"use client";

import { useState } from "react";
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
        changePassword,
    } = useUser();

    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState(false);

    const handleChangePassword = () => {
        const result = changePassword();
        setPasswordError(result.error ?? "");
        setPasswordSuccess(result.success);
    };

    return (
        <div className="flex flex-col gap-4">
            <section>
                <h2 className="settings__subtitle">Смена пароля</h2>
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
                {passwordError && (
                    <p className="settings__error">{passwordError}</p>
                )}
                {passwordSuccess && (
                    <p className="settings__success">Пароль успешно изменён</p>
                )}
                <Btn type="button" onClick={handleChangePassword}>Изменить пароль
                </Btn>
            </section>
            <Sessions />
            <section className="settings__danger">
                <h2 className="settings__subtitle">Опасная зона</h2>
                <p className="settings__description mb-2">Удаление аккаунта необратимо. Все данные аккаунта будут удалены.</p>
                <Btn type="button" variant="red">Удалить аккаунт</Btn>
            </section>
        </div>
    );
}