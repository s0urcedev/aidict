import { getSet } from '../../../../api/sets';
import type { PageServerLoad, PageServerLoadEvent } from './$types';
 
export const load: PageServerLoad = (async ({ params }: PageServerLoadEvent) => {
    const set = await getSet(params.slug);
    return {
        set: {
            _id: set?._id?.toString(),
            name: set?.name,
            authorsEmail: set?.authorsEmail,
            words: set?.words.map(element => { return { wordId: element.wordId.toString(), wordName: element.wordName, wordLanguage: element.wordLanguage }; } )
        }
    };
});