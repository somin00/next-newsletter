import { MongoClient } from "mongodb";

const DB_URL = process.env.NEXT_PUBLIC_MONGO_URL;

export const connectToDB = async () => {
  const client = await MongoClient.connect(DB_URL);
  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
};

export async function getAllDocuments(client, collection, eventId, sort) {
  const db = client.db();

  const documents = await db.collection("comments").find({ eventId: eventId }).sort({ _id: -1 }).toArray();

  return documents;
}
