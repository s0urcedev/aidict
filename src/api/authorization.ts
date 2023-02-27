import { MongoClient, type Db, type Collection } from 'mongodb';
import { settings } from '../settings';
import type { User } from './types';

const client: MongoClient = new MongoClient(settings.authDBURL);

const dbUsers: Db = client.db('users');
const collectionUsers: Collection = dbUsers.collection('users');

export async function registerUser(name: string, email: string, password: string): Promise<number> {
    await client.connect();
    if (await collectionUsers.findOne({ email: email }) === null) {
        await collectionUsers.insertOne({ name: name, email: email, password: password, sets: [] } as User);
        await client.close();
        return 200;
    } else {
        await client.close();
        return 400;
    }
}

export async function loginUser(email: string, password: string): Promise<number> {
    await client.connect();
    if (await collectionUsers.findOne({ email: email, password: password }) !== null) {
        await client.close();
        return 200;
    } else {
        await client.close();
        return 400;
    }
}