'use client'

import { Field } from "@/components/ui/Field/Field";
import { Btn } from "@/components/ui/Btn/Btn";
import { useState } from "react";
import "../form.scss"

export const RegisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="auth-form">
            <div className="auth-form__head">
                <img src="/icons/logo.svg" width={32} height={32}/>
                <h1 className="auth-form__title">Регистрация</h1>
            </div>
            <form className="auth-form__form">
                <Field
                    label="Имя"
                    type="text"
                    value={name}
                    onChange={setName}
                    placeholder="Имя"
                />
                <Field
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="name@company.com"
                />
                <Field
                    label="Пароль"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Минимум 12 символов"
                />
                <label className="auth-form__agreement">
                    <div className="auth-form__remember">
                        <input type="checkbox"/>
                        <span>
                            Я согласен с{" "}
                            <a className="auth-form__forgot" href="#">Условиями использования</a>{" "}
                            и{" "}
                            <a className="auth-form__forgot" href="#">Политикой конфиденциальности</a>.
                        </span>
                    </div>
                </label>
                <Btn type="submit">Создать новый аккаунт</Btn>
            </form>
        </div>
    );
};

