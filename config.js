export const dev = process.env.NODE_ENV !== 'production';
export const root = __dirname;
export const mongo_host = process.env.MONGO_HOST || "mongodb://localhost:27017/test-db";
