export default function handler(req, res) {
  const { eventId } = req.query;

  if (req.method === "GET") {
    const DUMMY_DATA = [
      { id: "e1", email: "test@email.com", name: "somin", text: "comment" },
      { id: "e2", email: "test1@email.com", name: "somin1", text: "comment1" },
    ];

    res.status(200).json({
      message: "댓글 요청 성공",
      comments: DUMMY_DATA,
    });
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (!email || !email.includes("@") || name.trim().length === 0 || text.trim().length === 0) {
      res.status(422).json({
        message: "올바른 형식이 아닙니다.",
      });
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    res.status(201).json({
      message: "댓글 저장 완료",
      newComment,
    });
  }
}
