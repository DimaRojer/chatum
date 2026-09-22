export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar: string;
    description: string;
    status: "online" | "offline" | "away";
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