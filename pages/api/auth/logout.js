import nc from "next-connect";
import { deleteCookie } from "cookies-next";

const handler = nc();

handler.get((req, res) => {
  deleteCookie("accessToken", {
    req,
    res,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json("User logged out!");
});

export default handler;
