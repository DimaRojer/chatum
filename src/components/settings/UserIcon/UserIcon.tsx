"use client";

import { useRef, useState } from "react";

import "./UserIcon.scss";

interface UserIconProps {
    avatar: string;
}

export const UserIcon = ({ avatar }: UserIconProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert("Максимальный размер файла — 5 MB");
            return;
        }

        if (!file.type.startsWith("image/")) {
            alert("Можно загрузить только изображение");
            return;
        }

        setPreview(URL.createObjectURL(file));
    };

    return (
        <div className="user-icon">
            <div className="user-icon__avatar">
                <img src={preview || avatar} alt="Avatar"/>
            </div>
            <div className="user-icon__info">
                <button
                    type="button"
                    className="user-icon__change"
                    onClick={() =>
                        inputRef.current?.click()
                    }
                >
                    Change Photo
                </button>
                <span className="user-icon__hint">Maximum size 5MB.</span>
                <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleFileChange}/>
            </div>
        </div>
    );
};