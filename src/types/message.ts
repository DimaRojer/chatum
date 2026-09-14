export interface Message {
    id: number;
    userId: number;
    time: string;
    text: string;
    attachments?: {
        name: string;
        type: string;
        size: number;
        url: string;
    }[];
}