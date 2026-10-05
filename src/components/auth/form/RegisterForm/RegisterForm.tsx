"use client";

import { Field } from "@/components/ui/Field/Field";
import { Btn } from "@/components/ui/Btn/Btn";
import { authService } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

import "../form.scss";

export const RegisterForm = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        if (!name.trim()) {
            setError("Введите имя");
            return;
        }

        if (!email.trim()) {
            setError("Введите email");
            return;
        }

        if (password.length < 8) {
            setError(
                "Пароль должен содержать минимум 8 символов"
            );
            return;
        }

        if (password !== passwordConfirm) {
            setError("Пароли не совпадают");
            return;
        }

        try {
            setIsLoading(true);

            const response =
                await authService.register({
                    name: name.trim(),
                    email: email.trim(),
                    password,
                });

            localStorage.setItem(
                "accessToken",
                response.access
            );

            localStorage.setItem(
                "refreshToken",
                response.refresh
            );

            router.push("/me");
        } catch (error) {
            console.error(
                "REGISTER ERROR:",
                error
            );

            setError(
                "Не удалось создать аккаунт"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-form">
            <div className="auth-form__head">
                <img
                    src="/icons/logo.svg"
                    width={32}
                    height={32}
                    alt=""
                />

                <h1 className="auth-form__title">
                    Регистрация
                </h1>
            </div>

            <form
                className="auth-form__form"
                onSubmit={handleSubmit}
            >
                <Field
                    id="reg-name"
                    name="name"
                    label="Имя"
                    type="text"
                    value={name}
                    onChange={setName}
                    placeholder="Имя"
                />

                <Field
                    id="reg-email"
                    name="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="name@company.com"
                />

                <Field
                    id="reg-password"
                    name="password"
                    label="Пароль"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Минимум 8 символов"
                />

                <Field
                    id="password-confirm"
                    name="password-confirm"
                    label="Повторите пароль"
                    type="password"
                    value={passwordConfirm}
                    onChange={setPasswordConfirm}
                    placeholder="Повторите пароль"
                />

                <label className="auth-form__agreement">
                    <div className="auth-form__remember">
                        <input type="checkbox" />

                        <span>
                            Я согласен с{" "}
                            <a
                                className="auth-form__forgot"
                                href="#"
                            >
                                Условиями использования
                            </a>{" "}
                            и{" "}
                            <a
                                className="auth-form__forgot"
                                href="#"
                            >
                                Политикой конфиденциальности
                            </a>
                            .
                        </span>
                    </div>
                </label>

                {error && (
                    <div className="auth-form__error">
                        {error}
                    </div>
                )}

                <Btn
                    type="submit"
                >
                    {isLoading
                        ? "Создание..."
                        : "Создать новый аккаунт"}
                </Btn>
            </form>
        </div>
    );
};