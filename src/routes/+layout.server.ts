import type { UserToken, User } from '../api/types';
import { getUser } from '../api/users';
import { getUsersWords } from '../api/words';
import { languages } from '../laguages';
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
                    usersWords: (await getUsersWords(user.email, user.password)).map(element => { return { id: element.wordId.toString(), text: `${element.wordName} (${languages['isoToName'][element.wordLanguage]})` }; }),
                    redirect: '',
                };
            } else {
                console.log(user);
                return {
                    user: {
                        name: '',
                        email: '',
                        password: ''
                    },
                    usersWords: [],
                    redirect: '/login'
                };
            }
        } else {
            console.log(cookies.get('token'));
            return {
                user: {
                    name: '',
                    email: '',
                    password: ''
                },
                usersWords: [],
                redirect: '/login'
            };
        }
    } catch (err) {
        console.log(err);
        return {
            user: {
                name: '',
                email: '',
                password: ''
            },
            usersWords: [],
            redirect: '/login'
        };
    }
});