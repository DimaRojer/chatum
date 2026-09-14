"use client";

import { useRef, useState } from "react";

import type { Message } from "@/types/message";
import { EmojiPicker } from "@/components/chat/EmojiPicker/EmojiPicker";
import { Icon } from "@/components/ui/Icon/Icon";
import { Attachments } from "@/components/chat/Attachments/Attachments";

import "./ChatInput.scss";

interface ChatInputProps {
    attachments: File[];
    onRemoveAttachment: (index: number) => void;
    onFiles: (files: File[]) => void;
    onClearAttachments: () => void;
    setMessages: React.Dispatch<
        React.SetStateAction<Message[]>
    >;
}

export const ChatInput = ({ attachments, onRemoveAttachment,onFiles, onClearAttachments,setMessages}: ChatInputProps) => {
    const [message, setMessage] = useState("");
    const [isEmojiOpen, setIsEmojiOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const handleEmojiSelect = (emoji: string) => { setMessage((prev) => prev + emoji)};
    const handleChange = ( e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = "24px";
        if (e.target.value.trim()) e.target.style.height = `${e.target.scrollHeight}px`;
        setMessage(e.target.value);
    };
    const handleFileChange = ( e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        onFiles(Array.from(e.target.files));
        e.target.value = "";
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if ( !message.trim() && attachments.length === 0) return;
        const messageAttachments = attachments.map((file) => ({
            name: file.name,
            type: file.type,
            size: file.size,
            url: URL.createObjectURL(file),
        }));

        setMessages((prev) => {
            const id = prev.length
                ? Math.max(
                    ...prev.map(
                        (message) => message.id
                    )
                ) + 1
                : 1;

            return [
                ...prev,
                {
                    id,
                    userId: 5,
                    time: new Date().toLocaleTimeString(
                        [],
                        {
                            hour: "2-digit",
                            minute: "2-digit",
                        }
                    ),
                    text: message.trim(),
                    attachments: messageAttachments,
                },
            ];
        });
        setMessage("");
        onClearAttachments();
        if (textareaRef.current) textareaRef.current.style.height = "24px";
    };

    const handleKeyDown = ( e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.form?.requestSubmit();
        }
    };

    return (
        <div className="chat-input">
            <Attachments files={attachments} onRemove={onRemoveAttachment}/>
            <form onSubmit={handleSubmit}>
                <div className="chat-input__wrapper">
                    <button className="btn-svg" type="button" onClick={() =>inputRef.current?.click()}>
                        <Icon name="paperclip" width={20} height={20}/>
                    </button>
                    <input ref={inputRef} type="file" multiple hidden onChange={handleFileChange}/>
                    <textarea
                        ref={textareaRef}
                        className="chat-input__field"
                        value={message}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Сообщение..."
                    />
                    <div 
                        className="chat-input__emoji"
                        onMouseEnter={() => setIsEmojiOpen(true)}
                        onMouseLeave={() => setIsEmojiOpen(false)}
                    >
                        <button type="button" className="btn-svg">
                            <Icon name="smile" width={20} height={20} />
                        </button>
                        
                        <div className={`emoji-picker-wrapper ${isEmojiOpen ? "is-open" : ""}`}>
                            <EmojiPicker onSelect={handleEmojiSelect} />
                        </div>
                    </div>
                    <button type="submit" className="chat-input__btn-send">
                        <Icon className="rotate-180" name="arrow" width={20} height={20}/>
                    </button>
                </div>
            </form>
        </div>
    );
};