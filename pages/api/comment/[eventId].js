import { connectToDB, insertDocument, getAllDocuments } from "../../../lib/db";

export default async function handler(req, res) {
  const { eventId } = req.query;

  let client = null;

  try {
    client = await connectToDB();
  } catch (error) {
    res.status(500).json({ message: "데이터베이스 연결에 실패했습니다." });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (!email || !email.includes("@") || name.trim().length === 0 || text.trim().length === 0) {
      res.status(422).json({
        message: "올바른 형식이 아닙니다.",
      });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result = null;
    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      res.status(201).json({
        message: "댓글 저장 완료",
        newComment,
      });
    } catch (error) {
      res.status(500).json({ message: "댓글 저장 실패" });
    }
  }

  if (req.method === "GET") {
    try {
      const comments = await getAllDocuments(client, "comments", eventId, { _id: -1 });
      res.status(200).json({
        message: "댓글 요청 성공",
        comments,
      });
    } catch (error) {
      res.status(500).json({ message: "댓글 로딩에 실패했습니다." });
    }
  }
  client.close();
}
