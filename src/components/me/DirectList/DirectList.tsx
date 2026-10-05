"use client";

import "./DirectList.scss";

import Image from "next/image";
import { useRouter } from "next/navigation";

import type { User } from "@/types/user";

import { useUser } from "@/context/UserContext";

interface DirectListProps {
    users: User[];
}

export const DirectList = ({
    users,
}: DirectListProps) => {
    const router = useRouter();

    const { user: currentUser } = useUser();

    const handleUserClick = (
        userId: number
    ) => {
        router.push(`/me/${userId}`);
    };

    const directUsers = users.filter(
        (user) =>
            user.id !== currentUser?.id
    );

    return (
        <div className="direct-list">
            {directUsers.map((user) => (
                <button
                    key={user.id}
                    type="button"
                    className="direct-list__item"
                    onClick={() =>
                        handleUserClick(user.id)
                    }
                >
                    <div className="direct-list__avatar">
                        <Image
                            src={
                                user.avatar ||
                                "/default-avatar.jpg"
                            }
                            alt={user.name}
                            width={40}
                            height={40}
                            unoptimized
                        />

                        <span
                            className={`network__status network__status--${user.status}`}
                        />
                    </div>

                    <div className="direct-list__content">
                        <div className="direct-list__name">
                            {user.name}
                        </div>

                        <div className="direct-list__description">
                            {user.email}
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
};