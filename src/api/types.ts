import type { ObjectId } from 'mongodb';

export type Translation = {
    language: string,
    translation: string
}

export type Word = {
    _id?: ObjectId,
    word: string,
    authorsEmail: string,
    setId: ObjectId,
    language: string,
    translations: Array<Translation>
    notes: string
}

export type Set = {
    _id?: ObjectId,
    name: string,
    authorsEmail: string
}

export type User = {
    _id?: ObjectId,
    name: string,
    email: string,
    password: string
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