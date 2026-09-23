import { api } from "./api";

interface LoginData {
    username: string;
    password: string;
}

interface AuthResponse {
    access: string;
    refresh: string;
}

export const authService = {
    async login(
        data: LoginData
    ): Promise<AuthResponse> {
        return api<AuthResponse>(
            "/auth/login/",
            {
                method: "POST",
                body: JSON.stringify(data),
            }
        );
    },

    async logout(): Promise<void> {
        await api(
            "/auth/logout/",
            {
                method: "POST",
            }
        );
    },
};