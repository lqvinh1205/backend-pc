import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Storage/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// const uploadMiddleware = async (type = "singer") => {
//   const fn = {
//     singer: upload.single("image"),
//     multil: upload.array("image"),
//   };
//   return upload.single("image");
// };

const uploadMiddleware = upload.single("image");

export default uploadMiddleware;
