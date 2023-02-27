import type { UserToken, User } from '../../api/types';
import { getUser } from '../../api/users';
import { decodeToken } from '../../security/jwt';
import type { PageServerLoad, PageServerLoadEvent } from './$types';

export const load: PageServerLoad  = (async ({ cookies }: PageServerLoadEvent) => {
    if (cookies.get('token') !== '' && cookies.get('token') !== null && cookies.get('token') !== undefined) {
        const userToken: UserToken = decodeToken(cookies.get('token') ?? '');
        const user: User | null = await getUser(userToken['email'], userToken['password']);
        if (user !== null) {
            return {
                sets: JSON.stringify(user.sets ?? '')
            };
        } else {
            return {
                sets: ''
            };
        }
    } else {
        return {
            sets: ''
        };
    }
});