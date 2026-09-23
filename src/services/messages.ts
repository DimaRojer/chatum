import type { Message } from "@/types/message";
import type { DRFPaginatedResponse } from "@/types/drf";

import { api } from "./api";

export const messagesService = {
    async getAll(
        channelId: number
    ): Promise<Message[]> {
        const data = await api<DRFPaginatedResponse<Message>>(`/channels/${channelId}/messages/`);
        return data.results;
    },

    async create(
        channelId: number,
        text: string
    ): Promise<Message> {
        return api<Message>(
            `/channels/${channelId}/messages/`,
            {
                method: "POST",
                body: JSON.stringify({text}),
            }
        );
    },

    async update(
        messageId: number,
        text: string
    ): Promise<Message> {
        return api<Message>(
            `/messages/${messageId}/`,
            {
                method: "PATCH",
                body: JSON.stringify({text}),
            }
        );
    },

    async delete(
        messageId: number
    ): Promise<void> {
        await api(
            `/messages/${messageId}/`,
            {
                method: "DELETE",
            }
        );
    },
};