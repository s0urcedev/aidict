import { json, error } from '@sveltejs/kit';
import { translateFromTo } from '../../api/translate';
import type { RequestEvent, RequestHandler } from './$types';
 
export const POST: RequestHandler = (async ({ request }: RequestEvent): Promise<Response> => {
    const { word, from, to } = await request.json();
    try {
        return json(await translateFromTo(word, from, to));
    } catch (err) {
        console.log(err);
        throw error(500, 'Issue on the server side with translations');
    }
});