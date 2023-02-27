import { MongoClient, type Db, type Collection } from 'mongodb';
import { settings } from '../settings';
import type { User } from './types';

const client: MongoClient = new MongoClient(settings.authDBURL);

const dbUsers: Db = client.db('users');
const collectionUsers: Collection = dbUsers.collection('users');

export async function getUser(email: string, password: string): Promise<User | null> {
    await client.connect();
    let res: User | null;
    try {
        res = (await collectionUsers.findOne({ email: email, password: password })) as User;
    } catch (err) {
        res = null;
    }
    await client.close();
    return res;
}