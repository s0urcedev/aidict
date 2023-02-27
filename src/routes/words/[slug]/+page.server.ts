import { getWord } from '../../../api/words';
import type { PageServerLoad, PageServerLoadEvent } from './$types';
 
export const load: PageServerLoad = (async ({ params }: PageServerLoadEvent) => {
    return {
        word: JSON.stringify(await getWord(params.slug))
    };
});