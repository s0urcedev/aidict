import type { LayoutServerLoad, LayoutServerLoadEvent } from './$types';

export const load: LayoutServerLoad = (async ({ locals }: LayoutServerLoadEvent) => {
    return locals as { user: { name: string, email: string, password: string }, usersWords: Array<{ id: string, text: string }> };
});