import type { Cookies } from '@sveltejs/kit';
import type { User, UserToken } from '../../api/types';
import { getUser } from '../../api/users';
import { decodeToken } from '../../security/jwt';
import type { PageServerLoad, PageServerLoadEvent } from './$types';

export const load: PageServerLoad  = (async ({ locals }: PageServerLoadEvent) => {
    try {
        const gotLocals = locals as {cookies: Cookies};
        if (gotLocals.cookies.get('token') !== undefined && gotLocals.cookies.get('token') !== null && gotLocals.cookies.get('token') !== '') {
            const userToken: UserToken = decodeToken(gotLocals.cookies.get('token') ?? '');
            const user: User | null = await getUser(userToken['email'], userToken['password']);
            if (user !== null) {
                return {
                    unauthorized: false,
                    sets: user.sets.map(element => { return { id: element.setId.toString(), name: element.setName }; })
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