export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar: string;
    description: string;
    status: "online" | "offline" | "away";
    sessions: {
        id: number;
        device: string;
        browser: string;
        location: string;
        ip: string;
        lastActive: string;
        current: boolean;
    }[];
    settings: {
        account: {
            twoFactorEnabled: boolean;
        };
        language: {
            language: string;
            dateFormat: string;
            timeFormat: string;
        };
    };
}