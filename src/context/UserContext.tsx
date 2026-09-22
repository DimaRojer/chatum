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

    const [user, setUser] = useState<User>(initialUser);

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