import nc from "next-connect";
import db from "../../../lib/db";
import jwt from "jsonwebtoken";

const handler = nc();

//get eho liked the post
handler.get((req, res) => {
  const q = "SELECT userId FROM likes WHERE postId = $1";

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data.rows.map((like) => like.userid));
  });
});

//delete like from post
handler.delete((req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In!");

  jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = "DELETE FROM likes WHERE userId = $1 AND postId = $2";

    db.query(q, [user.id, req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been disliked!");
    });
  });
});

export default handler;
