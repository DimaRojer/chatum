"use client";

import { useState } from "react";

import type { Channel } from "@/types/channel";
import { Modal } from "@/components/ui/Modal/Modal";

import "./AddChatModal.scss";

interface AddChannelModalProps {
    isOpen: boolean;
    onClose: () => void;
    channels: Channel[];
    onConfirm: (name: string) => void;
}

export const AddChannelModal = ({ isOpen, onClose, channels, onConfirm,}: AddChannelModalProps) => {
    const [name, setName] = useState("");
    const trimmedName = name.trim();
    const isExists = channels.some( (channel) => channel.name.toLowerCase() === trimmedName.toLowerCase());

    const handleConfirm = () => {
        if (!trimmedName || isExists) return;

        onConfirm(trimmedName);
        setName("");
        onClose();
    };

    const handleClose = () => {
        setName("");
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <div className="add-channel-modal">
                <div className="modal__header">
                    <h3 className="modal__title">Новый чат</h3>
                </div>
                <div className="modal__main">
                    <div className="modal__input-field">
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Название канала"
                            className="modal__input"
                        /> 
                        {isExists && (
                            <span className="modal__error">Канал с таким названием уже существует</span>
                        )}
                    </div>
                </div>
                <div className="modal__footer">
                    <div className="flex gap-3 justify-end">
                        <button type="button" className="modal__button modal__button--transparent" onClick={handleClose}>
                            Отмена
                        </button>
                        <button type="button" className="modal__button" disabled={!trimmedName || isExists} onClick={handleConfirm}>
                            Создать
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};