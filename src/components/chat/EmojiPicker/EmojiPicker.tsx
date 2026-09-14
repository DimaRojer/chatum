"use client";

import "./EmojiPicker.scss";

interface EmojiPickerProps {
    onSelect: (emoji: string) => void;
}

const emojis = [
    "😀", "😃", "😄", "😁", "😆", "😅",
    "😂", "🤣", "😊", "😇", "🙂", "🙃",
    "😉", "😌", "😍", "🥰", "😘", "😎",
    "🤔", "😐", "😑", "😶", "🙄", "😏",
    "😢", "😭", "😡", "🤬", "😱", "😴",
    "👍", "👎", "👏", "🙏", "❤️", "🔥",
    "🎉", "💯", "🚀", "💀", "👀", "✨",
];

export const EmojiPicker = ({ onSelect}: EmojiPickerProps) => {
    return (
        <div className="emoji-picker">
            <div className="emoji-picker__list">
                {emojis.map((emoji) => (
                    <button key={emoji} type="button" className="emoji-picker__item" onClick={() => onSelect(emoji)}>
                        {emoji}
                    </button>
                ))}
            </div>
        </div>
    );
};