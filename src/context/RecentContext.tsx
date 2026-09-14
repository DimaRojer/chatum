"use client";

import { createContext, useContext, useState,} from "react";
interface RecentContextType {
    recentUserIds: number[];
    addRecentUser: (userId: number) => void;
}

const RecentContext = createContext<RecentContextType | null>(null);

export const RecentProvider = ({children,}: {children: React.ReactNode;}) => {
    const [recentUserIds, setRecentUserIds] = useState<number[]>([]);

    const addRecentUser = (userId: number) => {
        setRecentUserIds((prev) => [
            userId,
            ...prev.filter((id) => id !== userId),
        ]);
    };

    return (
        <RecentContext.Provider value={{ recentUserIds,addRecentUser,}}>
            {children}
        </RecentContext.Provider>
    );
};

export const useRecent = () => {
    const context = useContext(RecentContext);
    if (!context) throw new Error("useRecent must be used inside RecentProvider");
    return context;
};