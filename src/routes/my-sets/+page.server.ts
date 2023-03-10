import { getUsersSets } from '../../api/sets';
import type { User, UserToken } from '../../api/types';
import { getUser } from '../../api/users';
import { decodeToken } from '../../security/jwt';
import type { PageServerLoad, PageServerLoadEvent } from './$types';

export const load: PageServerLoad  = (async ({ cookies }: PageServerLoadEvent) => {
    try {
        if (cookies.get('token') !== undefined && cookies.get('token') !== null && cookies.get('token') !== '') {
            const userToken: UserToken = decodeToken(cookies.get('token') ?? '');
            const user: User | null = await getUser(userToken['email'], userToken['password']);
            if (user !== null) {
                return {
                    unauthorized: false,
                    sets: await getUsersSets(user.email)
                };
            } else {
                return {
                    unauthorized: true,
                    sets: []
                };
            }
        } else {
            return {
                unauthorized: true,
                sets: []
            };
        }
    } catch (err) {
        return {
            unauthorized: true,
            sets: []
        };
    }
});