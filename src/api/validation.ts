import type { Cookies, User, UserToken } from './types';
import { decodeToken } from '../security/jwt';
import { getUser } from './users';

export async function isLoggedinAndValid(cookies: Cookies) {
    if (cookies.token !== '') {
        try {
            const userToken: UserToken = decodeToken(cookies.token);
            const userDB: User = await getUser(userToken.email, userToken.password);
            return userDB !== null;
        } catch (err) {
            return false;
        }
    } else {
        return false;
    }
}