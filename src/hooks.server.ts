import type { Handle } from '@sveltejs/kit';
import { translateFromTo } from './api/translate';

translateFromTo('Hello', 'en', 'uk');

export const handle: Handle = async ({ event, resolve }) => {
    event.locals = {
        cookies: event.cookies
    };
    return resolve(event);
};