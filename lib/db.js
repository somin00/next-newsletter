import { MongoClient } from "mongodb";

const MONGO_PWD = process.env.NEXT_PUBLIC_MONGO_PWD;
const dbUrl = `mongodb+srv://root:${MONGO_PWD}@cluster0.wvwp8.mongodb.net/meetups?retryWrites=true&w=majority
`;

export const connectToDB = async () => {
  const client = await MongoClient.connect(dbUrl);
  return client;
};
