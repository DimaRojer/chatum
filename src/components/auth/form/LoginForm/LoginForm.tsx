"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Btn } from "@/components/ui/Btn/Btn";
import { Field } from "@/components/ui/Field/Field";
import { authService } from "@/services/auth";

import "../form.scss";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        try {
            const data = await authService.login({
                email,
                password,
            });

            console.log("LOGIN:", data);

            localStorage.setItem(
                "accessToken",
                data.access
            );

            localStorage.setItem(
                "refreshToken",
                data.refresh
            );

            router.push("/me");
        } catch (error) {
            console.error("LOGIN ERROR:", error);

            setError(
                "Неверный email или пароль"
            );
        }
    };

    return (
        <div className="auth-form">
            <div className="auth-form__head">
                <img
                    src="/icons/logo.svg"
                    width={32}
                    height={32}
                    alt="Chatum"
                />

                <h1 className="auth-form__title">
                    Войти
                </h1>
            </div>

            <form
                className="auth-form__form"
                onSubmit={handleSubmit}
            >
                <Field
                    id="login-email"
                    name="login-email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="sarah.connor@cyberdyne.io"
                />

                <Field
                    id="login-password"
                    name="login-password"
                    label="Пароль"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    placeholder="••••"
                />

                <div className="auth-form__agreement">
                    <label className="auth-form__remember">
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={(event) =>
                                setRemember(
                                    event.target.checked
                                )
                            }
                        />

                        <span>
                            Остаться в системе
                        </span>
                    </label>

                    <a
                        href="#"
                        className="auth-form__forgot"
                        onClick={(event) =>
                            event.preventDefault()
                        }
                    >
                        Забыли пароль?
                    </a>
                </div>

                {error && (
                    <div className="error-block">
                        {error}
                    </div>
                )}

                <Btn type="submit">
                    Войти
                </Btn>
            </form>
        </div>
    );
};

