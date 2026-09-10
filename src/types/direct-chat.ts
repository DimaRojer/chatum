import type { Message } from "./message";

export interface DirectChat {
    id: number;
    userIds: number[];
    messages: Message[];
}