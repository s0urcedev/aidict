import { json } from '@sveltejs/kit';
import { deleteSet } from '../../api/sets';
import type { User, UserToken } from '../../api/types';
import { getUser } from '../../api/users';
import { decodeToken } from '../../security/jwt';
import type { RequestEvent, RequestHandler } from './$types';
 
export const POST: RequestHandler = (async ({ request, cookies }: RequestEvent): Promise<Response> => {
    const { setId } = await request.json();
    if (cookies.get('token') !== '' && cookies.get('token') !== null && cookies.get('token') !== undefined) {
        const userToken: UserToken = decodeToken(cookies.get('token') ?? '');
        const user: User | null = await getUser(userToken['email'], userToken['password']) as User;
        if (user !== null) {
            await deleteSet(setId);
            return json('');
        } else {
            return json('');
        }
    } else {
        return json('');
    }
});