"use client";

import { useState } from "react";
import Image from "next/image";

import { Modal } from "@/components/ui/Modal/Modal";
import { Search } from "@/components/ui/Search/Search";

import type { User } from "@/types/user";


interface AddMembersModalProps {
    isOpen: boolean;
    onClose: () => void;
    users: User[];
    memberIds: number[];
}

export const AddMembersModal = ({
    isOpen,
    onClose,
    users,
    memberIds,
}: AddMembersModalProps) => {
    const [selectedUsers, setSelectedUsers] =
        useState<number[]>([]);

    const [search, setSearch] = useState("");

    const availableUsers = users.filter(
        (user) => !memberIds.includes(user.id)
    );

    const filteredUsers = availableUsers.filter(
        (user) =>
            user.name
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    const handleUserToggle = (userId: number) => {
        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    const handleClose = () => {
        setSelectedUsers([]);
        setSearch("");
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
        >
            <div className="new-group-modal">
                <div className="modal__header">
                    <h3 className="modal__title">Добавить участников</h3>
                </div>
                <div className="modal__main">
                    <Search value={search} onChange={setSearch}/>
                    <div className="new-group-modal__list mt-4">
                        {filteredUsers.map((user) => {
                            const isSelected = selectedUsers.includes(user.id);
                            return (
                                <label
                                    key={user.id}
                                    className={`new-group-modal__user ${
                                        isSelected
                                            ? "new-group-modal__user--selected"
                                            : ""
                                    }`}
                                >
                                    <div className="avatar-image-wrapper">
                                        <Image
                                            width={32}
                                            height={32}
                                            src={user.avatar}
                                            alt={user.name}
                                            className="avatar-image"
                                            unoptimized
                                        />
                                    </div>
                                    <span className="new-group-modal__user-name">{user.name}</span>
                                    <input
                                        className="ml-auto"
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() =>
                                            handleUserToggle(
                                                user.id
                                            )
                                        }
                                    />
                                </label>
                            );
                        })}
                    </div>
                </div>

                <div className="modal__footer">
                    <div className="flex gap-3 justify-end">
                        <button
                            type="button"
                            className="modal__button modal__button--transparent"
                            onClick={handleClose}
                        >
                            Отмена
                        </button>

                        <button
                            type="button"
                            className="modal__button"
                            disabled={
                                selectedUsers.length === 0
                            }
                        >
                            Добавить
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};