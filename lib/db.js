import { MongoClient } from "mongodb";

const DB_URL = process.env.NEXT_PUBLIC_MONGO_URL;

export const connectToDB = async () => {
  const client = await MongoClient.connect(DB_URL);
  return client;
};
