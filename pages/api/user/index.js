import nc from "next-connect";
import db from "../../../lib/db";
import jwt from "jsonwebtoken";

const handler = nc();

handler.put((req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Authenticated!");

  jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q =
      "UPDATE users SET name = $1, city = $2, profilePic = $3, coverPic = $4, about = $5 WHERE id = $6 ";

    db.query(
      q,
      [
        req.body.name,
        req.body.city,
        req.body.profilePic,
        req.body.coverPic,
        req.body.about,
        user.id,
      ],
      (err, data) => {
        if (err) res.status(500).json(err);

        if (data.rowCount > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your own post!");
      }
    );
  });
});

export default handler;
