import { connectToDB } from "../../../lib/db";

export default async function handler(req, res) {
  const { eventId } = req.query;

  const client = await connectToDB();
  const db = await client.db();

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

    const result = await db.collection("comments").insertOne(newComment);

    if (result) newComment._id = result.insertedId;

    res.status(201).json({
      message: "댓글 저장 완료",
      newComment,
    });
  }

  if (req.method === "GET") {
    const client = await connectToDB();
    const db = await client.db();
    const comments = await db.collection("comments").find({ eventId: eventId }).sort({ _id: -1 }).toArray();

    res.status(200).json({
      message: "댓글 요청 성공",
      comments,
    });
  }
}
