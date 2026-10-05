"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import type { User } from "@/types/user";
import { meService } from "@/services/me";

interface UserContextType {
    user: User | null;
    updateUser: (data: Partial<User>) => void;
    logout: () => void;

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
    const [user, setUser] =
        useState<User | null>(null);

    const [password, setPassword] =
        useState("Chatum123!");

    const [currentPassword, setCurrentPassword] =
        useState("");

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    useEffect(() => {
        meService
            .get()
            .then((user) => {
                console.log("AUTH USER:", user);
                setUser(user);
            })
            .catch((error) => {
                console.error(
                    "AUTH USER ERROR:",
                    error
                );
            });
    }, []);

    const updateUser = (data: Partial<User>) => {
        setUser((prev) => {
            if (!prev) return prev;

            return {
                ...prev,
                ...data,
            };
        });
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        setUser(null);

        window.location.href = "/login";
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
                logout,

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