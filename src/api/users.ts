import { MongoClient, type Db, type Collection } from 'mongodb';
import { settings } from '../settings';
import type { User } from './types';

export async function getUser(email: string, password: string): Promise<User | null> {
    const client: MongoClient = new MongoClient(settings.authDBURL);
    const dbUsers: Db = client.db('users');
    const collectionUsers: Collection = dbUsers.collection('users');
    await client.connect();
    const res: User | null = (await collectionUsers.findOne({ email: email, password: password })) as User;
    await client.close();
    return res;
}