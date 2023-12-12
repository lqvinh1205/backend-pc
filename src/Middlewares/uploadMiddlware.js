import multer from "multer";
import path from "path";
import fs from "fs/promises";

// const uploadDir = (req, file, cb) => {
//   const dynamicPath = path.join(process.cwd(), "src", "Storage", "uploads"); // Thay đổi đường dẫn dựa trên userId hoặc bất kỳ thông tin nào bạn muốn
//   fs.mkdir(dynamicPath, { recursive: true })
//     .then(() => {
//       cb(null, dynamicPath);
//     })
//     .catch((err) => {
//       cb(err, null);
//     });
// };

// const storage = multer.diskStorage({
//   destination: uploadDir,
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({ storage: storage });

// export default upload;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
export default upload;
