import nc from "next-connect";
import db from "../../../lib/db";
import jwt from "jsonwebtoken";

const handler = nc();

//like
handler.post((req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = "INSERT INTO likes (userId, postId) VALUES ($1, $2)";

    const values = [user.id, req.body.postId];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been liked!");
    });
  });
});

export default handler;
