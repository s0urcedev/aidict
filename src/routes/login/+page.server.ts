import { redirect, type Redirect } from '@sveltejs/kit';
import { loginUser } from '../../api/authorization';
import { hash } from '../../security/hashing';
import { generateToken } from '../../security/jwt';
import type { Actions, RequestEvent } from './$types';
 
export const actions: Actions = {
    default: async ({ cookies, request }: RequestEvent) => {
        const data: FormData = await request.formData();
        let resRedirect: Redirect;
        try {
            if (await loginUser(String(data.get('email')), hash(String(data.get('password')))) === 200) {
                cookies.set('token', generateToken({ email: String(data.get('email')), password: hash(String(data.get('password'))) }), { sameSite: 'strict', maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true, path: '/' });
                resRedirect = redirect(303, '/');
            } else {
                cookies.set('token', '', { sameSite: 'strict', maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true, path: '/' });
                resRedirect = redirect(303, '/login?message=Wrong email or password');
            }
        } catch (err) {
            cookies.set('token', '', { sameSite: 'strict', maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true, path: '/' });
            resRedirect = redirect(303, '/login?message=Something went wrong on our side');
        }
        throw resRedirect;
    }
};