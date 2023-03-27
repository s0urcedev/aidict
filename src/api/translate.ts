import { translate } from '@vitalets/google-translate-api';
import createHttpProxyAgent from 'http-proxy-agent';
import { getProxys } from '../security/proxys';
import type { Proxy } from './types';

let currentProxy: Proxy | null = null;

export async function translateFromTo(word: string, from: string, to: string): Promise<string> {
    try {
        return (await translate(word, { from: from, to: to })).text;
    } catch (err) {
        try {
            if (currentProxy === null) {
                throw 'No proxy set';
            } else {
                return (await translate(word, { from: from, to: to, fetchOptions: { agent: createHttpProxyAgent(`http://${currentProxy.ip}:${currentProxy.port}`) } })).text;
            }
        } catch (err) {
            for (const proxy of await getProxys()) { 
                try {
                    const res = (await translate(word, { from: from, to: to, fetchOptions: { agent: createHttpProxyAgent(`http://${proxy.ip}:${proxy.port}`) } })).text;
                    currentProxy = proxy;
                    console.log(`${proxy.ip}:${proxy.port} works!`);
                    return res;
                } catch (err) {
                    console.log(`${proxy.ip}:${proxy.port} doesn't work`);
                }
            }
            throw err;
        }
    }
}