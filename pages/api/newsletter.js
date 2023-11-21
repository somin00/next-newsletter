export default function handler(req, res) {
  if (req.method !== "POST") return;

  const { email } = req.body;

  if (!email || !email.includes("@")) {
    res.status(422).json({
      message: "올바른 형식의 이메일을 입력해 주세요.",
    });
    return;
  }

  res.status(201).json({
    message: "뉴스 레터를 구독했습니다.",
    email,
  });
}
