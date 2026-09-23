'use client'

import { useState } from "react";
import { Btn } from "@/components/ui/Btn/Btn";
import { Field } from "@/components/ui/Field/Field";
import "../form.scss"

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    return (
        <div className="auth-form">
            <div className="auth-form__head">
                <img src="/icons/logo.svg" width={32} height={32}/>
                <h1 className="auth-form__title">Войти</h1>
            </div>
            <form className="auth-form__form">
                <Field
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="sarah.connor@cyberdyne.io"
                />

                <Field
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
                                setRemember(event.target.checked)
                            }
                        />
                        <span>Остаться в системе</span>
                    </label>
                    <a href="" className="auth-form__forgot">Забыли пароль?</a>
                </div>
                <Btn type="submit">Войти</Btn>
            </form>
        </div>
    );
};


