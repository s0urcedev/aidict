import { error } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = (async ({ cookies }: RequestEvent): Promise<Response> => {
    try {
        cookies.delete('token');
        return new Response('Redirect', { status: 303, headers: { Location: '/' } });
    } catch (err) {
        throw error(500, String(err));
    }
});