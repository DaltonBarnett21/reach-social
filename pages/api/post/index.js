import nc from "next-connect";
import db from "../../../lib/db";
import jwt from "jsonwebtoken";

const handler = nc();

//get all timeline posts
handler.get((req, res) => {
  const userId = req.query.userId;

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In!");

  jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = userId
      ? "SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = $1 ORDER BY p.timestamp DESC "
      : `SELECT DISTINCT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) 
     LEFT JOIN relationships AS r ON (p.userId = r.followeduserId) WHERE r.followersuserId = $1 OR p.userId = $2 ORDER BY p.timestamp DESC`;

    const values = userId ? [userId] : [user.id, user.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.rows);
    });
  });
});

//created post
handler.post((req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged in!");

  jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO posts(description, img, userId) VALUES ($1, $2, $3)";

    const values = [req.body.description, req.body.img, user.id];

    db.query(q, values, (err, data) => {
      console.log(err);
      if (err) return res.status(500).json(err);

      return res.status(200).json("Post Created!");
    });
  });
});

//delete post
handler.delete((req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("you're not logged in");

  jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM posts WHERE id = $1 AND userId = $2";

    db.query(q, [req.query.postId, user.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.rowCount > 0)
        return res.status(200).json("Post has been deleted!");
      return res.status(403).json("you can only deleted your own post!");
    });
  });
});

export default handler;
