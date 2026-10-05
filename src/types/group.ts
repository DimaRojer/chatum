import type { Channel } from "./channel";

export interface Group {
    id: number;
    name: string;
    owner: number;
    admin?: number[];
    editor?: number[];
    description: string;
    icon: string;
    memberIds: number[];
    channels: Channel[];
}