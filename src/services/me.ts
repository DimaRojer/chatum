import type { User } from "@/types/user";
import { api } from "./api";

export const meService = {
    async get(): Promise<User> {
        return api<User>("/auth/me");
    },
};