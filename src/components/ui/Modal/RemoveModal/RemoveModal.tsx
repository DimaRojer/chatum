"use client";

import { Modal } from "@/components/ui/Modal/Modal";

import "./RemoveModal.scss"

interface RemoveModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}


export const RemoveModal = ({ isOpen, onClose, onConfirm}: RemoveModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="remove-modal">
                <div className="modal__main">
                    <h2 className="remove-modal__title">Вы точно хотите удалить диалог?</h2>
                </div>
                <div className="modal__footer">
                    <div className="flex gap-3 justify-end">
                        <button type="button" className="remove-modal__button remove-modal__button--cancel" onClick={onClose}>Отмена</button>
                        <button type="button" className="remove-modal__button remove-modal__button--remove" onClick={onConfirm}>Удалить</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};