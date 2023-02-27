import { json, error } from '@sveltejs/kit';
import { getExaplanation } from '../../api/ai';
import type { RequestEvent, RequestHandler } from './$types';
 
export const POST: RequestHandler = (async ({ request }: RequestEvent): Promise<Response> => {
    const { language, word } = await request.json();
    try {
        return json(await getExaplanation(language, word));
    } catch (err) {
        console.log(err);
        throw error(500, 'Issue on the server side with explanation');
    }
});