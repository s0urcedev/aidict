import { json } from '@sveltejs/kit';
import type { User, UserToken } from '../../api/types';
import { getUser } from '../../api/users';
import { decodeToken } from '../../security/jwt';
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = (async ({ cookies }: RequestEvent): Promise<Response> => {
    try {
        if (cookies.get('token') !== undefined && cookies.get('token') !== null && cookies.get('token') !== '') {
            const userToken: UserToken = decodeToken(cookies.get('token') ?? '');
            const user: User | null = await getUser(userToken['email'], userToken['password']);
            return json(user);
        } else {
            return json(null);
        }
    } catch (err) {
        return json(null);
    }
});