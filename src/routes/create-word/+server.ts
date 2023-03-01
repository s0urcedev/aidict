import { json } from '@sveltejs/kit';
import type { User, UserToken } from '../../api/types';
import { getUser } from '../../api/users';
import { createWord } from '../../api/words';
import { decodeToken } from '../../security/jwt';
import type { RequestEvent, RequestHandler } from './$types';
 
export const POST: RequestHandler = (async ({ request, cookies }: RequestEvent): Promise<Response> => {
    const { setId, word, language, translations, notes } = await request.json();
    if (cookies.get('token') !== '' && cookies.get('token') !== null && cookies.get('token') !== undefined) {
        const userToken: UserToken = decodeToken(cookies.get('token') ?? '');
        const user: User | null = await getUser(userToken['email'], userToken['password']) as User;
        if (user !== null) {
            return json(((await createWord(setId, word, user.email, language, translations, notes))).toString());
        } else {
            return json('');
        }
    } else {
        return json('');
    }
});