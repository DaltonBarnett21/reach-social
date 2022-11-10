import nc from "next-connect";
import db from "../../../lib/db";
import jwt from "jsonwebtoken";

const handler = nc();

//follow
handler.post((req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Token is not valid!");

  jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO relationships (followersuserId, followeduserId) VALUES ($1, $2)";

    const values = [user.id, req.query.userId];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Following!");
    });
  });
});

//unfollow
handler.delete((req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In!");

  jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json("Token is not valid!");

    const q =
      "DELETE FROM relationships WHERE followersuserid = $1 AND followeduserid = $2";

    db.query(q, [user.id, req.query.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Unfollowed!");
    });
  });
});

export default handler;
