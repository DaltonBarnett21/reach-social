import nc from "next-connect";
import db from "../../../lib/db";
import bcrypt from "bcryptjs";

const handler = nc();

// register user
handler.post((req, res) => {
  const q = "SELECT FROM users WHERE username = $1";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.rows.length) return res.status(409).json("user already exists");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q = `INSERT INTO users (username,email,password,name) VALUES ($1, $2 , $3 , $4)`;

    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("user has been created!");
    });
  });
});

export default handler;
