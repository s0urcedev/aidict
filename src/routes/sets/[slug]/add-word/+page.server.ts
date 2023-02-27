import { getSet } from '../../../../api/sets';
import type { PageServerLoad, PageServerLoadEvent } from './$types';
 
export const load: PageServerLoad = (async ({ params }: PageServerLoadEvent) => {
    return {
        set: JSON.stringify(await getSet(params.slug))
    };
});