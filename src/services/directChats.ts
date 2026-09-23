import { DirectChat } from '@/types/direct-chat';
import { DRFPaginatedResponse } from '@/types/drf';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const directChatsService = {
	async getAll(): Promise<DirectChat[]> {
		const res = await fetch(`${API_URL}/direct-chats/`);
		if (!res.ok) throw new Error('Failed to fetch direct chats');
		const data: DRFPaginatedResponse<DirectChat> = await res.json();
		return data.results;
	},
};