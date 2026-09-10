export type UserStatus = "online" | "offline" | "away";

export interface User {
    id: number;
    name: string;
    avatar: string;
    description: string;
    status: UserStatus;
}