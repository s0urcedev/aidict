import { MongoClient, type Collection, ObjectId } from 'mongodb';
import { settings } from '../settings';
import type { Translation, Word } from './types';

export async function createWord(setId: string, word: string, email: string, language: string, translations: Array<Translation>, notes: string): Promise<ObjectId> {
    const client: MongoClient = new MongoClient(settings.authDBURL);
    const collectionWords: Collection = client.db('words').collection('words');
    await client.connect();
    const newWordId: ObjectId = (await collectionWords.insertOne({ word: word, authorsEmail: email, setId: new ObjectId(setId), language: language, translations: translations, notes: notes } as Word)).insertedId;
    await client.close();
    return newWordId;
}

export async function getWord(id: string): Promise<Word | null> {
    const client: MongoClient = new MongoClient(settings.authDBURL);
    const collectionWords: Collection = client.db('words').collection('words');
    await client.connect();
    const res: Word | null = (await collectionWords.findOne({ _id: new ObjectId(id) })) as Word;
    await client.close();
    return res;
}

export async function deleteWord(wordId: string): Promise<void> {
    const client: MongoClient = new MongoClient(settings.authDBURL);
    const collectionWords: Collection = client.db('words').collection('words');
    await client.connect();
    await collectionWords.deleteOne({ _id: new ObjectId(wordId) });
    await client.close();
}

export async function getUsersWords(email: string): Promise<Array<{ id: string, word: string, language: string }>> {
    const client: MongoClient = new MongoClient(settings.authDBURL);
    const collectionWords: Collection = client.db('words').collection('words');
    await client.connect();
    const usersWords = (await (collectionWords.find({ authorsEmail: email }, { projection: { word: 1, language: 1 } })).map(doc => { return { id: doc._id.toString(), word: doc.word, language: doc.language }; }).toArray()) as Array<{ id: string, word: string, language: string }>;
    await client.close();
    return usersWords;
}