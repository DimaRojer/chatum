import type { User } from "@/types/user";
import { api } from "./api";

export const usersService = {
    async getAll(): Promise<User[]> {
        return api<User[]>("/users/");
    },

    async getById(userId: number): Promise<User> {
        return api<User>(`/users/${userId}/`);
    },
};