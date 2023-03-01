import type { Handle } from '@sveltejs/kit';
import { translateFromTo } from './api/translate';
import type { User, UserToken } from './api/types';
import { getUser } from './api/users';
import { getUsersWords } from './api/words';
import { languages } from './laguages';
import { decodeToken } from './security/jwt';

translateFromTo('Hello', 'en', 'uk');

const unProtectedRoutes: string[] = [
    '/login',
    '/register'
];

export const handle: Handle = async ({ event, resolve }) => {
    try {
        if (event.cookies.get('token') !== undefined && event.cookies.get('token') !== null && event.cookies.get('token') !== '') {
            const userToken: UserToken = decodeToken(event.cookies.get('token') ?? '');
            const user: User | null = await getUser(userToken['email'], userToken['password']);
            if (user !== null) {
                event.locals = {
                    user: {
                        name: user?.name,
                        email: user?.email,
                        password: user?.password
                    },
                    sets: user.sets.map(element => { return { id: element.setId.toString(), name: element.setName }; }),
                    usersWords: (await getUsersWords(user.email, user.password)).map(element => { return { id: element.wordId.toString(), text: `${element.wordName} (${languages['isoToName'][element.wordLanguage]})` }; })
                };
            } else {
                if (!unProtectedRoutes.includes(event.url.pathname)) {
                    return new Response('', { status: 303, headers: { location: '/login' } });
                } else {
                    event.locals = {
                        user: {
                            name: '',
                            email: '',
                            password: ''
                        },
                        sets: [],
                        usersWords: []
                    };
                }
            }
        } else {
            if (!unProtectedRoutes.includes(event.url.pathname)) {
                return new Response('', { status: 303, headers: { location: '/login' } });
            } else {
                event.locals = {
                    user: {
                        name: '',
                        email: '',
                        password: ''
                    },
                    sets: [],
                    usersWords: []
                };
            }
        }
    } catch (err) {
        if (!unProtectedRoutes.includes(event.url.pathname)) {
            return new Response('', { status: 303, headers: { location: '/login' } });
        } else {
            event.locals = {
                user: {
                    name: '',
                    email: '',
                    password: ''
                },
                sets: [],
                usersWords: []
            };
        }
    }
    return resolve(event);
};