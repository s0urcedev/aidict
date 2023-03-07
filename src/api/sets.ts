import { MongoClient, type Collection, ObjectId } from 'mongodb';
import { settings } from '../settings';
import type { Set } from './types';
import { deleteWord } from './words';

export async function createSet(email: string, setName: string): Promise<ObjectId> {
    const client: MongoClient = new MongoClient(settings.authDBURL);
    const collectionSets: Collection = client.db('sets').collection('sets');
    await client.connect();
    const newSetId: ObjectId = (await collectionSets.insertOne({ name: setName, authorsEmail: email, words: [] } as Set)).insertedId;
    await client.close();
    return newSetId;
}

export async function getSet(id: string): Promise<Set | null> {
    const client: MongoClient = new MongoClient(settings.authDBURL);
    const collectionSets: Collection = client.db('sets').collection('sets');
    await client.connect();
    const res: Set | null = (await collectionSets.findOne({ _id: new ObjectId(id) })) as Set;
    await client.close();
    return res;
}

export async function deleteSet(setId: string): Promise<void> {
    const client: MongoClient = new MongoClient(settings.authDBURL);
    const collectionSets: Collection = client.db('sets').collection('sets');
    const collectionWords: Collection = client.db('words').collection('words');
    await client.connect();
    for (const word of await (collectionWords.find({ setId: new Object(setId) })).toArray()) {
        await deleteWord(word.wordId.toString());
    }
    await collectionSets.deleteOne({ _id: new ObjectId(setId) });
    await client.close();
}

export async function getUsersSets(email: string): Promise<Array<{ id: string, name: string }>> {
    const client: MongoClient = new MongoClient(settings.authDBURL);
    const collectionSets: Collection = client.db('sets').collection('sets');
    await client.connect();
    const usersSets = (await (collectionSets.find({ authorsEmail: email }, { projection: { name: 1 } })).map(doc => { return { id: doc._id.toString(), name: doc.name }; }).toArray()) as Array<{ id: string, name: string }>;
    await client.close();
    return usersSets;
}

export async function getSetsWords(setId: string): Promise<Array<{ id: string, word: string, language: string }>> {
    const client: MongoClient = new MongoClient(settings.authDBURL);
    const collectionWords: Collection = client.db('words').collection('words');
    await client.connect();
    const usersSets = (await (collectionWords.find({ setId: new ObjectId(setId) }, { projection: { word: 1, language: 1 } })).map(doc => { return { id: doc._id.toString(), word: doc.word, language: doc.language }; }).toArray()) as Array<{ id: string, word: string, language: string }>;
    await client.close();
    return usersSets;
}
