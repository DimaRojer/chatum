import { NextResponse } from 'next/server';
import { directChats } from '@/data/directChats';
export async function GET() {
	await new Promise((resolve) => setTimeout(resolve, 200));

	return NextResponse.json({
		count: directChats.length,
		next: null,
		previous: null,
		results: directChats,
	});
}