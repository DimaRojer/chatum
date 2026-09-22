"use client";

import { Modal } from "@/components/ui/Modal/Modal";
import "./RemoveModal.scss";

interface RemoveModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description?: string;
    confirmText: string;
    cancelText: string;
}

export const RemoveModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText,
    cancelText,
}: RemoveModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="remove-modal">
                <div className="modal__main">
                    <h2 className="remove-modal__title">{title}</h2>
                    {description && (<p className="remove-modal__description">{description}</p>)}
                </div>
                <div className="modal__footer">
                    <div className="flex gap-3 justify-end">
                        <button
                            type="button"
                            className="remove-modal__button remove-modal__button--cancel"
                            onClick={onClose}
                        >
                            {cancelText}
                        </button>
                        <button
                            type="button"
                            className="remove-modal__button remove-modal__button--remove"
                            onClick={onConfirm}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};