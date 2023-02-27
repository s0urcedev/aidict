import { settings } from '../settings';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: settings.openAIKey,
});
const openai = new OpenAIApi(configuration);

export async function getExaplanation(originalLanguage: string, word: string) {
    const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Collect this information about ${originalLanguage} word ${word}: Explanation; Examples`,
        temperature: 0.7,
        max_tokens: 300
    });
    return completion.data.choices[0].text;
}