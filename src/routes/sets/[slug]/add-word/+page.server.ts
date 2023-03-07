import { getSet } from '../../../../api/sets';
import type { PageServerLoad, PageServerLoadEvent } from './$types';
 
export const load: PageServerLoad = (async ({ params }: PageServerLoadEvent) => {
    const set = await getSet(params.slug);
    return {
        set: {
            id: set?._id?.toString(),
            name: set?.name,
            authorsEmail: set?.authorsEmail,
        }
    };
});