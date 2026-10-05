import { Message } from "./message";

export interface Channel {
    id: number;
    name: string;
    unreadCount: number;
    messages: Message[];
}