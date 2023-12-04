import createHttpError from "http-errors";
import ImageModel from "../Models/Image.model";
const fs = require("fs/promises");
const path = require("path");

const findImageById = async (id) => {
  return await ImageModel.findById(id);
};

const findAllImageById = async (id) => {
  return await ImageModel.find({ _id: id });
};

const createImage = async (files) => {
  const filePaths = await handleUpload(files, "single");
  console.log(filePaths);
  return false;
  return await ImageModel.create(filePaths);
};

const createMultilImages = async (files) => {
  const filePaths = await handleUpload(files, "multil");
  console.log(filePaths);
  return false;
  return await ImageModel.insertMany(filePaths);
};

const deleteImage = async (id) => {
  return await ImageModel.findByIdAndDelete(id);
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
        uploadedFiles.push(path.join("src", "Storage", "uploads", filename));
      }
      return uploadedFiles;
    case "single":
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const filename =
        files.fieldname + "-" + uniqueSuffix + path.extname(files.originalname);
      const filePath = path.join(dynamicPath, filename);
      await fs.writeFile(filePath, files.buffer);
      return filePath;
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
};
