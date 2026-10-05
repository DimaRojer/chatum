import { Message } from "./message";


export interface SearchMessage {
    key: string;
    message: Message;
    type: "group" | "people";
    title: string;
    groupId?: number;
    channelId?: number;
    userId?: number;
}