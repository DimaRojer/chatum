"use client";

import {
    createContext,
    useContext,
    useState,
} from "react";

import { users } from "@/data/users";
import { currentUserId } from "@/data/currentUser";
import type { User } from "@/types/user";

interface UserContextType {
    user: User;
    updateUser: (data: Partial<User>) => void;

    currentPassword: string;
    newPassword: string;
    confirmPassword: string;

    setCurrentPassword: (value: string) => void;
    setNewPassword: (value: string) => void;
    setConfirmPassword: (value: string) => void;

    changePassword: () => {
        success: boolean;
        error?: string;
    };
}

const UserContext =
    createContext<UserContextType | null>(null);

export const UserProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const initialUser = users.find(
        (user) => user.id === currentUserId
    );

    if (!initialUser) {
        throw new Error("Current user not found");
    }

    const [user, setUser] =
        useState<User>(initialUser);

    const [password, setPassword] =
        useState("Chatum123!");

    const [currentPassword, setCurrentPassword] =
        useState("");

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const updateUser = (data: Partial<User>) => {
        setUser((prev) => ({
            ...prev,
            ...data,
        }));
    };

    const changePassword = () => {
        if (!currentPassword) {
            return {
                success: false,
                error: "Введите текущий пароль",
            };
        }

        if (currentPassword !== password) {
            return {
                success: false,
                error: "Неверный текущий пароль",
            };
        }

        if (!newPassword) {
            return {
                success: false,
                error: "Введите новый пароль",
            };
        }

        if (newPassword.length < 8) {
            return {
                success: false,
                error:
                    "Новый пароль должен содержать минимум 8 символов",
            };
        }

        if (newPassword === currentPassword) {
            return {
                success: false,
                error:
                    "Новый пароль должен отличаться от текущего",
            };
        }

        if (newPassword !== confirmPassword) {
            return {
                success: false,
                error: "Пароли не совпадают",
            };
        }

        setPassword(newPassword);

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        return {
            success: true,
        };
    };

    return (
        <UserContext.Provider
            value={{
                user,
                updateUser,

                currentPassword,
                newPassword,
                confirmPassword,

                setCurrentPassword,
                setNewPassword,
                setConfirmPassword,

                changePassword,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error(
            "useUser must be used inside UserProvider"
        );
    }

    return context;
};