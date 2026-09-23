import type { DRFErrorResponse } from "@/types/drf";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const api = async <T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> => {
    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        }
    );

    if (!response.ok) {
        const error: DRFErrorResponse = await response.json();
        throw error;
    }
    return response.json();
};