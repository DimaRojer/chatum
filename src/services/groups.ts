import type { Group } from "@/types/group";

import { api } from "./api";

export const groupsService = {
    async getAll(): Promise<Group[]> {
        return api<Group[]>("/groups/");
    },

    async getById(
        groupId: number
    ): Promise<Group> {
        return api<Group>(
            `/groups/${groupId}/`
        );
    },

    async create(
        data: Partial<Group>
    ): Promise<Group> {
        return api<Group>(
            "/groups/",
            {
                method: "POST",
                body: JSON.stringify(data),
            }
        );
    },
};