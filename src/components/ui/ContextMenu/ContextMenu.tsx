"use client";

import { useEffect, useState } from "react";

import "./ContextMenu.scss";

interface ContextMenuProps {
    children: React.ReactNode;
    menu: React.ReactNode;
    messageId?: number;
}

export const ContextMenu = ({
    children,
    menu,
    messageId
}: ContextMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0,});
    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        if (isOpen) {
            setIsOpen(false);
            return;
        }
        const eventDetail = new CustomEvent("context-menu-open");
        window.dispatchEvent(eventDetail);
        setPosition({x: event.clientX, y: event.clientY,});
        setIsOpen(true);
    };

    useEffect(() => {
        const handleOtherMenuOpen = () => setIsOpen(false);
        window.addEventListener( "context-menu-open",handleOtherMenuOpen);
        return () => {
            window.removeEventListener( "context-menu-open", handleOtherMenuOpen);
        };
    }, []);
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (event.button === 0) setIsOpen(false);
        };
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <>
            <div className="message-wrapper" onContextMenu={handleContextMenu}>{children}</div>
            {isOpen && (
                <div
                    className="context-menu"
                    style={{
                        left: position.x,
                        top:
                            position.y > window.innerHeight / 2
                                ? undefined
                                : position.y,
                        bottom:
                            position.y > window.innerHeight / 2
                                ? window.innerHeight - position.y
                                : undefined,
                    }}
                >
                    {menu}
                </div>
            )}
        </>
    );
};

