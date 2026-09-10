"use client";

import { useState } from "react";
import Image from "next/image";
import { Modal } from "@/components/ui/Modal/Modal";
import type { User } from "@/types/user";
import { Search } from "@/components/ui/Search/Search";
import { directChats } from "@/data/directChats";
import { currentUserId } from "@/data/currentUser";

import "./AddGroupModal.scss";

interface AddGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    users: User[];
    onConfirm: ( name: string, description: string, memberIds: number[]) => void;
}

export const AddGroupModal = ({ isOpen, onClose, users, onConfirm,}: AddGroupModalProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [search, setSearch] = useState("");
    const chatUserIds = [
        ...new Set(
            directChats
                .filter( (chat) => chat.userIds.includes(currentUserId) && chat.messages.length > 0)
                .flatMap((chat) => chat.userIds.filter( (userId) => userId !== currentUserId))
        ),
    ];

    const chatUsers = users.filter((user) => chatUserIds.includes(user.id));
    const filteredUsers = chatUsers.filter((user) =>user.name.toLowerCase().includes(search.toLowerCase()));
    const handleUserToggle = (userId: number) => {
        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };
    const handleSubmit = () => {
        if (!name.trim()) return;
        onConfirm( name.trim(), description.trim(),selectedUsers);
        setName("");
        setDescription("");
        setSelectedUsers([]);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="new-group-modal">
                <div className="modal__header">
                    <h3 className="modal__title"> Создать группу</h3>
                </div>
                <div className="modal__main">
                    <div className="modal__input-field">
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Название группы"
                            className="modal__input"
                        />
                        <textarea
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            placeholder="Описание группы"
                            className="modal__textarea"
                        />
                    </div>
                    <div className="new-group-modal__members">
                        <span className="new-group-modal__members-title">Участники</span>
                        <Search value={search} onChange={setSearch}/>
                        <div className="new-group-modal__list mt-4">
                            {filteredUsers.map((user) => {
                                const isSelected = selectedUsers.includes(user.id);
                                return (
                                    <label key={user.id} className={`new-group-modal__user ${ isSelected ? "new-group-modal__user--selected": ""}`}>
                                        <div className="avatar-image-wrapper">
                                            <Image width={32} height={32} src={user.avatar} alt={user.name} className="avatar-image" unoptimized/>
                                        </div>
                                        <span className="new-group-modal__user-name">{user.name}</span>
                                        <input className="ml-auto" type="checkbox" name="" id="" onChange={() => handleUserToggle(user.id)}/>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="modal__footer">
                    <div className="flex gap-3 justify-end">
                        <button type="button" className="modal__button modal__button--transparent"onClick={onClose}>Отмена</button>
                        <button type="button" className="modal__button" onClick={handleSubmit} disabled={!name.trim()}>Создать</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};