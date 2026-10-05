"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { groupsService } from "@/services/groups";
import { useUser } from "@/context/UserContext";

import type { Group } from "@/types/group";
import type { Channel } from "@/types/channel";

interface GroupsContextType {
    groups: Group[];
    createGroup: (
        name: string,
        description: string,
        memberIds: number[]
    ) => void;
    createChannel: (
        groupId: number,
        name: string
    ) => void;
    leaveGroup: (
        groupId: number
    ) => void;
    deleteChannel: (
        groupId: number,
        channelId: number
    ) => void;
}

const GroupsContext =
    createContext<GroupsContextType | null>(null);

export const GroupsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { user: currentUser } = useUser();

    const [groups, setGroups] =
        useState<Group[]>([]);

    useEffect(() => {
        groupsService
            .getAll()
            .then(setGroups)
            .catch((error) => {
                console.error(
                    "GROUPS ERROR:",
                    error
                );
            });
    }, []);

    const createGroup = (
        name: string,
        description: string,
        memberIds: number[]
    ) => {
        if (!currentUser) return;

        const newGroup: Group = {
            id: Date.now(),
            name,
            description,
            icon: "",
            owner: currentUser.id,
            memberIds: [
                currentUser.id,
                ...memberIds.filter(
                    (id) =>
                        id !== currentUser.id
                ),
            ],
            channels: [
                {
                    id: Date.now(),
                    name: "general",
                    unreadCount: 0,
                    messages: [],
                },
            ],
        };

        setGroups((prev) => [
            ...prev,
            newGroup,
        ]);
    };

    const leaveGroup = (
        groupId: number
    ) => {
        if (!currentUser) return;

        setGroups((prev) =>
            prev.map((group) =>
                group.id === groupId
                    ? {
                          ...group,
                          memberIds:
                              group.memberIds.filter(
                                  (id) =>
                                      id !==
                                      currentUser.id
                              ),
                      }
                    : group
            )
        );
    };

    const createChannel = (
        groupId: number,
        name: string
    ) => {
        const newChannel: Channel = {
            id: Date.now(),
            name,
            unreadCount: 0,
            messages: [],
        };

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
        groupId: number,
        channelId: number
    ) => {
        setGroups((prev) =>
            prev.map((group) =>
                group.id === groupId
                    ? {
                          ...group,
                          channels:
                              group.channels.filter(
                                  (channel) =>
                                      channel.id !==
                                      channelId
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
    const context = useContext(
        GroupsContext
    );

    if (!context) {
        throw new Error(
            "useGroups must be used inside GroupsProvider"
        );
    }

    return context;
};