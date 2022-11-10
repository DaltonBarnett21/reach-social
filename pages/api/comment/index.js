import nc from "next-connect";
import db from "../../../lib/db";
import jwt from "jsonwebtoken";

const handler = nc();

handler.post((req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "INSERT INTO comments(description, userid, postid) VALUES ($1, $2, $3)";

    const values = [req.body.description, user.id, req.body.postId];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("Comment has been created");
    });
  });
});

export default handler;
