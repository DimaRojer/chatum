import { api } from "./api";

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

interface AuthResponse {
    access: string;
    refresh: string;
    user: {
        id: number;
        name: string;
        email: string;
        avatar: string;
        status: "online" | "offline" | "away";
    };
}

export const authService = {
    async login(
        data: LoginData
    ): Promise<AuthResponse> {
        return api<AuthResponse>(
            "/auth/login",
            {
                method: "POST",
                body: JSON.stringify(data),
            }
        );
    },

    async register(
        data: RegisterData
    ): Promise<AuthResponse> {
        return api<AuthResponse>(
            "/register/",
            {
                method: "POST",
                body: JSON.stringify(data),
            }
        );
    },
};