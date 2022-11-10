import nc from "next-connect";
import db from "../../../lib/db";
import jwt from "jsonwebtoken";

const handler = nc();

handler.delete((req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Authenticated!");

  jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, user) => {
    const q = "DELETE FROM comments WHERE id = $1 AND userid = $2";

    db.query(q, [req.query.commentId, user.id], (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.rowCount > 0)
        return res.status(200).json("Comment has been deleted!");
      return res.status(403).json("You can only delete your posts!");
    });
  });
});

export default handler;
