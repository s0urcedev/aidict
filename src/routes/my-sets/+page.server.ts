import type { PageServerLoad, PageServerLoadEvent } from './$types';

export const load: PageServerLoad  = (async ({ locals }: PageServerLoadEvent) => {
    return locals as {
        user: {name: string, email: string, password: string},
        sets: Array<{
            id: string,
            name: string
        }>,
        usersWords: Array<{
            id: string,
            text: string
        }>
    };
});