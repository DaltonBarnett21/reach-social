import nc from "next-connect";
import db from "../../../lib/db";

const handler = nc();

handler.get((req, res) => {
  const userId = req.query.id;
  const q = "SELECT * FROM users WHERE id = $1";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data.rows[0];
    res.status(200).json(info);
  });
});

export default handler;
