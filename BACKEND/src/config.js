import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.APP_PORT

export const mongoDir = process.env.MONGO_DIR

export const host = process.env.APP_HOST

