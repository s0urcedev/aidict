import * as dotenv from 'dotenv';
dotenv.config();
export const settings = {
    authDBURL: process.env.AUTH_DB_URL ?? '',
    jwtSecretToken: process.env.JWT_SECRET_TOKEN ?? '',
    openAIKey: process.env.OPEN_AI_KEY ?? ''
};