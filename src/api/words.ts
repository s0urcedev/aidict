import { MongoClient, type Db, type Collection, ObjectId } from 'mongodb';
import { settings } from '../settings';
import type { Translation, WordContent, WordHeaders } from './types';

const client: MongoClient = new MongoClient(settings.authDBURL);
const dbSets: Db = client.db('sets');
const collectionSets: Collection = dbSets.collection('sets');
const dbWords: Db = client.db('words');
const collectionWords: Collection = dbWords.collection('words');

export async function createWord(setId: string, word: string, email: string, language: string, translations: Array<Translation>, explanation: string): Promise<ObjectId> {
    await client.connect();
    const newWordId: ObjectId = (await collectionWords.insertOne({ word: word, authorsEmail: email, setId: new ObjectId(setId), language: language, translations: translations, explanation: explanation } as WordContent)).insertedId;
    await collectionSets.updateOne({ _id: new ObjectId(setId) }, { $push: { words: { wordId: newWordId, wordName: word, wordLanguage: language } as WordHeaders } });
    await client.close();
    return newWordId;
}

export async function getWord(id: string): Promise<WordContent | null> {
    await client.connect();
    const res: WordContent | null = (await collectionWords.findOne({ _id: new ObjectId(id) })) as WordContent;
    await client.close();
    return res;
}

export async function deleteWord(setId: string, wordId: string, wordName: string, wordLanguage: string): Promise<void> {
    await client.connect();
    await collectionSets.updateOne({ _id: new ObjectId(setId) }, { $pull: { words: { wordId: new ObjectId(wordId), wordName: wordName, wordLanguage: wordLanguage } as WordHeaders } });
    await collectionWords.deleteOne({ _id: new ObjectId(wordId) });
    await client.close();
}