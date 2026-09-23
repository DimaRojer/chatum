import type { Group } from "@/types/group";
import type { DRFPaginatedResponse } from "@/types/drf";

import { api } from "./api";

export const groupsService = {
    async getAll(): Promise<Group[]> {
        const data = await api<DRFPaginatedResponse<Group>>("/groups/");
        return data.results;
    },

    async getById(
        groupId: number
    ): Promise<Group> {
        return api<Group>(`/groups/${groupId}/`);
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