import type { Cookies } from '@sveltejs/kit';
import type { User, UserToken } from '../api/types';
import { getUser } from '../api/users';
import { decodeToken } from '../security/jwt';
import type { LayoutServerLoad, LayoutServerLoadEvent } from './$types';

export const load: LayoutServerLoad = (async ({ locals }: LayoutServerLoadEvent) => {
    try {
        const gotLocals = locals as { cookies: Cookies };
        console.log(gotLocals);
        if (gotLocals.cookies.get('token') !== undefined && gotLocals.cookies.get('token') !== null && gotLocals.cookies.get('token') !== '') {
            const userToken: UserToken = decodeToken(gotLocals.cookies.get('token') ?? '');
            const user: User | null = await getUser(userToken['email'], userToken['password']);
            if (user !== null) {
                return {
                    unauthorized: false
                };
            } else {
                return {
                    unauthorized: true
                };
            }
        } else {
            return {
                unauthorized: true
            };
        }
    } catch (err) {
        return {
            unauthorized: true
        };
    }
});