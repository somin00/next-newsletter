import { connectToDB } from "../../lib/db";

const DB_URL = process.env.NEXT_PUBLIC_MONGO_URL;

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  const { email } = req.body;

  if (!email || !email.includes("@")) {
    res.status(422).json({
      message: "올바른 형식의 이메일을 입력해 주세요.",
    });
    return;
  }

  const client = await connectToDB();
  const db = await client.db();
  const result = await db.collection("emails").insertOne({ email: email });

  client.close();

  res.status(201).json({
    message: "뉴스 레터를 구독했습니다.",
    userEmail: email,
  });
}
