import type { Proxy } from '../api/types';

export async function getProxys(): Promise<Array<Proxy>> {
    return (await (await fetch('https://proxylist.geonode.com/api/proxy-list?limit=500&page=1&sort_by=speed&sort_type=asc&google=true&protocols=http%2Chttps&anonymityLevel=elite&anonymityLevel=anonymous')).json()).data;
}