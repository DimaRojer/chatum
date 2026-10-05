import type { DirectChat } from "@/types/direct-chat";
import { api } from "./api";

export const directChatsService = {
    async getAll(): Promise<DirectChat[]> {
        return api<DirectChat[]>(
            "/direct-chats/"
        );
    },

    async getById(
        chatId: number
    ): Promise<DirectChat> {
        return api<DirectChat>(
            `/direct-chats/${chatId}/`
        );
    },
};