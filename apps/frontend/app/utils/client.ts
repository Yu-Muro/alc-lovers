import { hc } from 'hono/client';
import type { ApiClient } from '../types/api';

if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

export const client = hc(
    process.env.NEXT_PUBLIC_API_URL,
) as unknown as ApiClient;
