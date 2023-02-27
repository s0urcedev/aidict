import type { UserToken, User } from '../api/types';
import { getUser } from '../api/users';
import { decodeToken } from '../security/jwt';
import type { LayoutServerLoad, LayoutServerLoadEvent } from './$types';

export const load: LayoutServerLoad = (async ({ cookies }: LayoutServerLoadEvent) => {
    try {
        if (cookies.get('token') !== undefined && cookies.get('token') !== null && cookies.get('token') !== '') {
            const userToken: UserToken = decodeToken(cookies.get('token') ?? '');
            const user: User | null = await getUser(userToken['email'], userToken['password']);
            if (user !== null) {
                return {
                    user: {
                        name: user?.name,
                        email: user?.email,
                        password: user?.password
                    },
                    redirect: ''
                };
            } else {
                return {
                    user: {
                        name: '',
                        email: '',
                        password: ''
                    },
                    redirect: '/login'
                };
            }
        } else {
            return {
                user: {
                    name: '',
                    email: '',
                    password: ''
                },
                redirect: '/login'
            };
        }
    } catch (err) {
        return {
            user: {
                name: '',
                email: '',
                password: ''
            },
            redirect: '/login'
        };
    }
});