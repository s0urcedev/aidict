import { error } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = (async ({ cookies }: RequestEvent): Promise<Response> => {
    try {
        cookies.set('token', '', { sameSite: 'strict', maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true, path: '/' });
        return new Response('Redirect', { status: 303, headers: { Location: '/' } });
    } catch (err) {
        throw error(500, String(err));
    }
});