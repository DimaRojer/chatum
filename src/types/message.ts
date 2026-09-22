export interface Message {
    id: number;
    userId: number;
    time: string;
    text: string;
    edited?: boolean;
    replyToId?: number;
    attachments?: {
        name: string;
        type: string;
        size: number;
        url: string;
    }[];
}