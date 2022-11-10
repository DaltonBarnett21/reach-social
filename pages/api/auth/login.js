import nc from "next-connect";
import db from "../../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";

const handler = nc();

handler.post((req, res) => {
  const q = "SELECT * FROM users WHERE username = $1";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.rows.length === 0)
      return res.status(404).json("Username Not Found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data.rows[0].password
    );

    if (!checkPassword) return res.status(400).json("wrong password!");

    const token = jwt.sign(
      { id: data.rows[0].id },
      process.env.NEXT_PUBLIC_JWT_SECRET
    );

    const { password, ...others } = data.rows[0];

    setCookie("accessToken", token, {
      req,
      res,
      httpOnly: true,
    });

    return res.status(200).json(others);
  });
});

export default handler;
