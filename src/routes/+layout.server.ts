import { ObjectId } from 'mongodb';
import type { User, UserToken } from '../api/types';
import { getUser } from '../api/users';
import { getUsersWords } from '../api/words';
import { decodeToken } from '../security/jwt';
import type { LayoutServerLoad, LayoutServerLoadEvent } from './$types';

ObjectId.prototype.toJSON = function(): string {
    return this.toString();
};

export const load: LayoutServerLoad = (async ({ cookies }: LayoutServerLoadEvent) => {
    try {
        if (cookies.get('token') !== undefined && cookies.get('token') !== null && cookies.get('token') !== '') {
            const userToken: UserToken = decodeToken(cookies.get('token') ?? '');
            const user: User | null = await getUser(userToken['email'], userToken['password']);
            if (user !== null) {
                return {
                    user: {
                        name: user.name,
                        email: user.email,
                        password: user.password
                    },
                    unauthorized: false,
                    usersWords: await getUsersWords(user.email)
                };
            } else {
                return {
                    user: {
                        name: '',
                        email: '',
                        password: ''
                    },
                    unauthorized: true,
                    usersWords: []
                };
            }
        } else {
            return {
                user: {
                    name: '',
                    email: '',
                    password: ''
                },
                unauthorized: true,
                usersWords: []
            };
        }
    } catch (err) {
        return {
            user: {
                name: '',
                email: '',
                password: ''
            },
            unauthorized: true,
            usersWords: []
        };
    }
});