import type { DRFErrorResponse } from "@/types/drf";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "/api";

export const api = async <T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> => {
    const token =
        typeof window !== "undefined"
            ? localStorage.getItem("accessToken")
            : null;

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(token
                    ? {
                        Authorization: `Bearer ${token}`,
                    }
                    : {}),
                ...options?.headers,
            },
        }
    );

    if (!response.ok) {
        let error: DRFErrorResponse;

        try {
            error = await response.json();
        } catch {
            error = {
                detail: ["Request failed"],
            };
        }

        throw error;
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json();
};