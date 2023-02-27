import { MongoClient, type Db, type Collection, ObjectId } from 'mongodb';
import { settings } from '../settings';
import type { SetContent, SetHeaders, WordHeaders } from './types';
import { deleteWord } from './words';

const client: MongoClient = new MongoClient(settings.authDBURL);

const dbUsers: Db = client.db('users');
const collectionUsers: Collection = dbUsers.collection('users');
const dbSets: Db = client.db('sets');
const collectionSets: Collection = dbSets.collection('sets');

export async function createSet(email: string, password: string, setName: string): Promise<ObjectId> {
    await client.connect();
    const newSetId: ObjectId = (await collectionSets.insertOne({ name: setName, authorsEmail: email, words: [] } as SetContent)).insertedId;
    await collectionUsers.updateOne({ email: email, password: password }, { $push: { sets: { setId: newSetId, setName: setName } as SetHeaders } });
    await client.close();
    return newSetId;
}

export async function getSet(id: string): Promise<SetContent | null> {
    await client.connect();
    const res: SetContent | null = (await collectionSets.findOne({ _id: new ObjectId(id) })) as SetContent;
    await client.close();
    return res;
}

export async function deleteSet(email: string, password: string, setId: string, setName: string, words: Array<WordHeaders>): Promise<void> {
    await client.connect();
    await collectionUsers.updateOne({ email: email, password: password }, { $pull: { sets: { setId: new ObjectId(setId), setName: setName } as SetHeaders } });
    for (const word of words) {
        await deleteWord(setId, word.wordId.toString(), word.wordName, word.wordLanguage);
    }
    await collectionSets.deleteOne({ _id: new ObjectId(setId) });
    await client.close();
}
