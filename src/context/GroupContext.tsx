"use client";

import { createContext, useContext, useState } from "react";
import { groups as initialGroups } from "@/data/groups";
import { currentUserId } from "@/data/currentUser";
import type { Group } from "@/types/group";
import type { Channel } from "@/types/channel";

import { useEffect } from "react";
import { groupsService } from "@/services/groups";
interface GroupsContextType {
    groups: Group[];
    createGroup: ( name: string, description: string, memberIds: number[]) => void;
    createChannel: ( groupId: string, name: string) => void;
    leaveGroup: (groupId: string) => void;
    deleteChannel: ( groupId: string, channelId: string) => void;
}

const GroupsContext = createContext<GroupsContextType | null>(null);

export const GroupsProvider = ({ children,}: { children: React.ReactNode;}) => {
    const [groups, setGroups] = useState(initialGroups);
    const createGroup = ( name: string,description: string, memberIds: number[]) => {
        const newGroup: Group = {
            id: crypto.randomUUID(),
            name,
            description,
            icon: "",
            owner: currentUserId,
            memberIds: [
                currentUserId,
                ...memberIds.filter(
                    (id) => id !== currentUserId
                ),
            ],
            channels: [
                {
                    id: "general",
                    name: "general",
                    unreadCount: 0,
                    messages: [],
                },
            ],
        };

        setGroups((prev) => [...prev, newGroup]);
    };

    const leaveGroup = (groupId: string) => {
        setGroups((prev) =>
            prev.map((group) =>
                group.id === groupId
                    ? {
                        ...group,
                        memberIds: group.memberIds.filter(
                            (id) => id !== currentUserId
                        ),
                    }
                    : group
            )
        );
    };

    const createChannel = ( groupId: string, name: string) => {
        const newChannel: Channel = {id: crypto.randomUUID(), name,unreadCount: 0, messages: [],};
        setGroups((prev) =>
            prev.map((group) =>
                group.id === groupId
                    ? {
                          ...group,
                          channels: [
                              ...group.channels,
                              newChannel,
                          ],
                      }
                    : group
            )
        );
    };

    const deleteChannel = (
        groupId: string,
        channelId: string
    ) => {
        setGroups((prev) =>
            prev.map((group) =>
                group.id === groupId
                    ? {
                        ...group,
                        channels: group.channels.filter(
                            (channel) =>
                                channel.id !== channelId
                        ),
                    }
                    : group
            )
        );
    };

    return (
        <GroupsContext.Provider
            value={{
                groups,
                createGroup,
                createChannel,
                deleteChannel,
                leaveGroup,
            }}
        >
            {children}
        </GroupsContext.Provider>
    );
};

export const useGroups = () => {
    const context = useContext(GroupsContext);
    if (!context) throw new Error("useGroups must be used inside GroupsProvider");
    return context;
};