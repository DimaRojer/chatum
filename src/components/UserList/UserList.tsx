"use client";

import "./UserList.scss";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { User } from "@/types/user";

import { Icon } from "@/components/ui/Icon/Icon";
import { RemoveModal } from "@/components/ui/Modal/RemoveModal/RemoveModal";

interface UserListProps {
    users: User[];
    onUserSelect?: () => void;
    variant?: "default" | "compact" | "group";
}

export const UserList = ({ users, variant = "default", onUserSelect,}: UserListProps) => {
    const pathname = usePathname();

    const [removedUserIds, setRemovedUserIds] = useState<number[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [isRemoveOpen, setIsRemoveOpen] = useState(false);

    const userList = users.filter((user) => !removedUserIds.includes(user.id));
    const handleRemove = (userId: number) => {setRemovedUserIds((prev) => [...prev, userId]);};
    const handleRemoveClick = (userId: number) => {
        if (variant === "default") {
            handleRemove(userId);
            return;
        }

        if (variant === "compact") {
            setSelectedUserId(userId);
            setIsRemoveOpen(true);
        }
    };

    const handleConfirmRemove = () => {
        if (selectedUserId === null) return;
        handleRemove(selectedUserId);
        setIsRemoveOpen(false);
        setSelectedUserId(null);
    };

    return (
        <>
            <ul className={`direct-list ${variant === "compact"? "direct-list--compact": ""}`}>
                {userList.map((user) => {
                    const isActive = pathname === `/me/${user.id}`;
                    return (
                        <li className="direct-list__item" key={user.id}>
                            <Link
                                href={`/me/${user.id}`}
                                onClick={() => {
                                    onUserSelect?.();
                                }}
                                className={`direct-list__link ${
                                    pathname === `/me/${user.id}`
                                        ? "direct-list__link--active"
                                        : ""
                                }`}
                            >
                                <div className="direct-list__user">
                                    <div className="avatar-image-wrapper">
                                        <Image
                                            src={user.avatar || "/default-avatar.jpg"}
                                            alt={user.name}
                                            width={24}
                                            height={24}
                                            unoptimized
                                            className="avatar-image"
                                        />
                                        <span className={`network__status network__status--${user.status}`}/>
                                    </div>
                                    <span className="direct-list__name">{user.name}</span>
                                </div>
                            </Link>
                            {variant !== "group" && (
                                <button
                                    type="button"
                                    className="btn-svg direct-list__remove"
                                    onClick={() =>
                                        handleRemoveClick(user.id)
                                    }
                                >
                                    <Icon name="close" width={24} height={24}/>
                                </button>
                            )}
                        </li>
                    );
                })}
            </ul>

            <RemoveModal
                isOpen={isRemoveOpen}
                onClose={() => {
                    setIsRemoveOpen(false);
                    setSelectedUserId(null);
                }}
                onConfirm={handleConfirmRemove}
                title="Вы точно хотите удалить диалог?"
                confirmText="Удалить"
                cancelText="Отмена"
            />
        </>
    );
};