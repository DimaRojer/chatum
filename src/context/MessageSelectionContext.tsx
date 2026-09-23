"use client";

import {
    createContext,
    useContext,
    useState,
} from "react";

interface MessageSelectionContextType {
    selectedMessageId: number | null;
    selectMessage: (id: number) => void;
    clearSelection: () => void;
}

const MessageSelectionContext =
    createContext<MessageSelectionContextType | null>(null);

export const MessageSelectionProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [selectedMessageId, setSelectedMessageId] =
        useState<number | null>(null);

    return (
        <MessageSelectionContext.Provider
            value={{
                selectedMessageId,

                selectMessage: setSelectedMessageId,

                clearSelection: () =>
                    setSelectedMessageId(null),
            }}
        >
            {children}
        </MessageSelectionContext.Provider>
    );
};

export const useMessageSelection = () => {
    const context = useContext(MessageSelectionContext);

    if (!context) {
        throw new Error(
            "useMessageSelection must be used inside MessageSelectionProvider"
        );
    }

    return context;
};