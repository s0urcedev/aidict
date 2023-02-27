import { sign, verify } from 'jsonwebtoken';
import type { UserToken } from '../api/types';
import { settings } from '../settings';

export function generateToken(object: UserToken): string {
    return sign(object, settings.jwtSecretToken, { expiresIn: '365d' });
}

export function decodeToken(token: string): UserToken {
    return verify(token, settings.jwtSecretToken) as UserToken;
}