export interface DRFPaginatedResponse<T> {
	count: number;
	next: string | null;
	previous: string | null;
	results: T[];
}

export interface DRFErrorResponse {
	[key: string]: string[];
}