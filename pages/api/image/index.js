import nc from "next-connect";
import multer from "multer";

const handler = nc();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });
let uploadFile = upload.single("file");

handler.use(uploadFile);
handler.post((req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
