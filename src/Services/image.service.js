import ImageModel from "../Models/Image.model";
const fs = require("fs/promises");
const path = require("path");

const findImageById = async (id) => {
  return await ImageModel.findById(id);
};

const findAllImageById = async (arrayOfIds) => {
  return await ImageModel.find({ _id: { $in: arrayOfIds } });
};

const createImage = async (files) => {
  const filename = await handleUpload(files, "single");
  return await ImageModel.create({ path: filename });
};

const createMultilImages = async (files) => {
  const filePaths = await handleUpload(files, "multil");
  const entries = filePaths.map((item) => ({ path: item }));
  return await ImageModel.insertMany(entries);
};

const deleteImage = async (id) => {
  const entries = await ImageModel.findByIdAndDelete(id);
  if (entries) {
    fs.unlink(
      path.join(process.cwd(), "src", "Storage", "uploads", entries.path)
    );
  }
  return entries;
};

const deleteMultilImage = async (ids) => {
  const entries = await ImageModel.find({ _id: { $in: ids } });
  await ImageModel.deleteMany({ _id: { $in: ids } });
  if (entries) {
    const paths = entries.map((item) => item.path);
    paths.forEach((nameFile) => {
      fs.unlink(
        path.join(process.cwd(), "src", "Storage", "uploads", nameFile)
      );
    });
  }
  return entries;
};

const handleUpload = async (files, type = "single") => {
  const dynamicPath = path.join(process.cwd(), "src", "Storage", "uploads");
  await fs.mkdir(dynamicPath, { recursive: true });
  switch (type) {
    case "multil":
      const uploadedFiles = [];
      for (const file of files) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename =
          file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname);
        const filePath = path.join(dynamicPath, filename);
        await fs.writeFile(filePath, file.buffer);
        uploadedFiles.push(filename);
      }
      return uploadedFiles;
    case "single":
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const filename =
        files.fieldname + "-" + uniqueSuffix + path.extname(files.originalname);
      const filePath = path.join(dynamicPath, filename);
      await fs.writeFile(filePath, files.buffer);
      return filename;
    default:
      break;
  }
};
export default {
  createImage,
  createMultilImages,
  findAllImageById,
  findImageById,
  deleteImage,
  deleteMultilImage,
};
