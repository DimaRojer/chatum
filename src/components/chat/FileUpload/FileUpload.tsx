"use client";

import { useEffect, useState } from "react";
import "./FileUpload.scss";

interface FileUploadProps {
    onFiles: (files: File[]) => void;
}

export const FileUpload = ({ onFiles}: FileUploadProps) => {
    const [isDragging, setIsDragging] = useState(false);
    useEffect(() => {
        const handleDragOver = (e: DragEvent) => {
            if (!e.dataTransfer?.types.includes("Files")) return;
            e.preventDefault();
            setIsDragging(true);
        };
        const handleDrop = (e: DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            const files = Array.from(e.dataTransfer?.files ?? []);
            if (files.length) onFiles(files);
        };
        const handleDragLeave = () => {setIsDragging(false);};
        window.addEventListener("dragover", handleDragOver);
        window.addEventListener("drop", handleDrop);
        window.addEventListener("dragleave", handleDragLeave);
        return () => {
            window.removeEventListener("dragover", handleDragOver);
            window.removeEventListener( "drop", handleDrop);
            window.removeEventListener( "dragleave", handleDragLeave);
        };
    }, [onFiles]);
    if (!isDragging) return null;
    return (
        <div className="file-upload__overlay">
            <div className="file-upload__drop-zone">
                <span className="file-upload__title">Перетащите файл сюда</span>
                <p className="file-upload__text">Отпустите файл, чтобы добавить его во вложения</p>
            </div>
        </div>
    );
};