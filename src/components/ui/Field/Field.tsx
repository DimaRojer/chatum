"use client";

import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/ui/Icon/Icon";

import "./Field.scss";

interface FieldOption {
    value: string;
    label: string;
}

interface FieldProps {
    id: string;
    name: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: "text" | "email" | "password" | "textarea" | "select";
    options?: FieldOption[];
}

export const Field = ({
    id,
    name,
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    options = [],
}: FieldProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const selectedOption = options.find( (option) => option.value === value);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener( "mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="field">
            <label className="field__label"> {label}</label>
            {type === "textarea" && (
                <textarea
                    className="field__input field__textarea"
                    value={value}
                    onChange={(event) =>
                        onChange(event.target.value)
                    }
                    placeholder={placeholder}
                />
            )}

            {type === "select" && (
                <div className="field__select" ref={selectRef}>
                    <button
                        type="button"
                        className="field__select-button"
                        onClick={() =>
                            setIsOpen((prev) => !prev)
                        }
                    >
                        <span>{selectedOption?.label || placeholder}</span>
                        <span
                            className={`field__select-arrow ${
                                isOpen
                                    ? "field__select-arrow--open"
                                    : ""
                            }`}
                        >
                            <Icon name="arrow" className="-rotate-90" width={16} height={16}/>
                        </span>
                    </button>
                    {isOpen && (
                        <div className="field__select-options">
                            {options.map((option) => (
                                <button
                                    type="button"
                                    className={`field__select-option ${
                                        option.value === value
                                            ? "field__select-option--active"
                                            : ""
                                    }`}
                                    key={option.value}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {type !== "textarea" &&
                type !== "select" && (
                    <div className="field__input-wrapper">
                        <input
                            className="field__input"
                            type={
                                type === "password"
                                    ? passwordVisible
                                        ? "text"
                                        : "password"
                                    : type
                            }
                            value={value}
                            onChange={(event) =>
                                onChange(event.target.value)
                            }
                            placeholder={placeholder}
                            autoComplete="current-password"
                                data-lpignore="true"
                        />
                        {type === "password" && (
                            <button
                                type="button"
                                className="field__password-toggle"
                                onClick={() =>
                                    setPasswordVisible(
                                        (prev) => !prev
                                    )
                                }
                            >
                                <Icon name={passwordVisible ? "eye-off" : "eye"} width={18} height={18}/>
                            </button>
                        )}
                    </div>
                )
            }
        </div>
    );
};