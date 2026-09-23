"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon/Icon";

import "./Attachments.scss";

interface AttachmentsProps {
    files: File[];
    onRemove: (index: number) => void;
}

interface AttachmentProps {
    file: File;
    onRemove: () => void;
}

const Attachment = ({ file, onRemove,}: AttachmentProps) => {
    const isImage = file.type.startsWith("image/");
    const preview = isImage ? URL.createObjectURL(file) : "";
    const extension = file.name.split(".").pop()?.toLowerCase();
    const iconName =
        extension === "doc" || extension === "docx"
            ? "doc"
            : extension === "pdf"
              ? "pdf"
              : extension === "xls" || extension === "xlsx"
                ? "xls"
                : extension === "zip"
                  ? "zip"
                  : "doc";

    return (
        <div className={`attachment ${!isImage ? "attachment--file" : ""}`}>
            {isImage ? (
                <Image
                    width={120}
                    height={120}
                    className="attachment__preview"
                    src={preview}
                    alt={file.name}
                    unoptimized
                />
            ) : (
                <div className="attachment__file">
                    <Image
                        className="attachment__icon"
                        src={`/icons/${iconName}.svg`}
                        alt=""
                        width={24}
                        height={24}
                    />
                    <span className="attachment__name">{file.name}</span>
                </div>
            )}
            <button type="button" className="attachment__remove" onClick={onRemove}>
                <Icon name="plus" width={20} height={20}/>
            </button>
        </div>
    );
};

export const Attachments = ({ files = [],onRemove}: AttachmentsProps) => {
    const attachmentsRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const handleMouseDown = ( event: React.MouseEvent<HTMLDivElement>) => {
        if (!attachmentsRef.current) return;
        setIsDragging(true);
        startX.current = event.pageX;
        scrollLeft.current = attachmentsRef.current.scrollLeft;
    };
    const handleMouseMove = ( event: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !attachmentsRef.current) return;
        const distance =  event.pageX - startX.current;
        attachmentsRef.current.scrollLeft = scrollLeft.current - distance;
    };
    const handleMouseUp = () => { setIsDragging(false)};
    const handleWheel = ( event: React.WheelEvent<HTMLDivElement>) => {
        if (!attachmentsRef.current) return;
        event.preventDefault();
        attachmentsRef.current.scrollLeft += event.deltaY;
    };
    if (!files.length) return null;
    return (
        <div
            ref={attachmentsRef}
            className={`attachments ${ isDragging ? "attachments--dragging" : ""}`}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {files.map((file, index) => (
                <Attachment
                    key={`${file.name}-${file.lastModified}-${index}`}
                    file={file}
                    onRemove={() => onRemove(index)}
                />
            ))}
        </div>
    );
};