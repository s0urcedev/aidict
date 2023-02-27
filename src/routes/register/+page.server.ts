import { redirect, type Redirect } from '@sveltejs/kit';
import { registerUser } from '../../api/authorization';
import { hash } from '../../security/hashing';
import type { Actions, RequestEvent } from './$types';
 
export const actions: Actions = {
    default: async ({ request }: RequestEvent) => {
        const data: FormData = await request.formData();
        let resRedirect: Redirect;
        if (String(data.get('password')) === String(data.get('confirmPassword'))) {
            try {
                if (await registerUser(String(data.get('name')), String(data.get('email')), hash(String(data.get('password')))) === 200) {
                    resRedirect = redirect(303, '/login?message=And now login');
                } else {
                    resRedirect = redirect(303, '/register?message=This email is already registered. Try to login');
                }
            } catch (err) {
                console.log(err);
                resRedirect = redirect(303, '/register?message=Something went wrong on our side');
            }
        } else {
            resRedirect = redirect(303, '/register?message=Password and confirm password are not same');
        }
        throw resRedirect;
    }
};