import nc from "next-connect";
import db from "../../../lib/db";
import jwt from "jsonwebtoken";

const handler = nc();

//get follow relationship
handler.get((req, res) => {
  const q =
    "SELECT followersuserid FROM relationships WHERE followeduserid = $1";

  db.query(q, [req.query.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(200)
      .json(data.rows.map((relationship) => relationship.followersuserid));
  });
});

export default handler;
