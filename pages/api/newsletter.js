import { connectToDB, insertDocument } from "../../lib/db";

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

  let client = null;

  try {
    client = await connectToDB();
  } catch (error) {
    res.status(500).json({ message: "데이터베이스 연결에 실패했습니다." });
    return;
  }

  let result = null;
  try {
    result = await insertDocument(client, "emails", { email: email });
    res.status(201).json({
      message: "사용자 등록 성공",
      userEmail: email,
    });
  } catch (error) {
    res.status(500).json({ message: "사용자 등록 실패" });
  }

  client.close();
}
