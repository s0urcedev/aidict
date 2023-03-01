import { getWord } from '../../../api/words';
import type { PageServerLoad, PageServerLoadEvent } from './$types';
 
export const load: PageServerLoad = (async ({ params }: PageServerLoadEvent) => {
    const word = await getWord(params.slug);
    return {
        word: {
            _id: word?._id?.toString(),
            word: word?.word,
            authorsEmail: word?.authorsEmail,
            setId: word?.setId.toString(),
            language: word?.language,
            translations: word?.translations,
            notes: word?.notes
        }
    };
});