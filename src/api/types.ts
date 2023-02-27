import type { ObjectId } from 'mongodb';

export type Translation = {
    language: string,
    translation: string
}

export type WordHeaders = {
    wordId: ObjectId,
    wordName: string,
    wordLanguage: string
}

export type WordContent = {
    _id?: ObjectId,
    word: string,
    authorsEmail: string,
    setId: ObjectId,
    language: string,
    translations: Array<Translation>
    explanation: string
}

export type SetHeaders = {
    setId: ObjectId,
    setName: string
}

export type SetContent = {
    _id?: ObjectId,
    name: string,
    authorsEmail: string,
    words: Array<WordHeaders>
}

export type User = {
    _id?: ObjectId,
    name: string,
    email: string,
    password: string,
    sets: Array<SetHeaders>
}

export type UserToken = {
    email: string,
    password: string
}

export type Cookies = {
    token: string
}

export type Proxy = {
    _id: string,
    ip: string,
    anonymityLevel: string,
    asn: string,
    city: string,
    country: string,
    created_at: string,
    google: string,
    isp: string,
    lastChecked: number,
    latency: number,
    org: string,
    port: string,
    protocols: Array<string>
}