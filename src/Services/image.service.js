import createHttpError from "http-errors";
import ImageModel from "../Models/Image.model";
import uploadMiddleware from "../Utils/uploadMiddlware";
const fs = require("fs/promises");
const path = require("path");
const multer = require("multer");

const findImageById = async (id) => {
  return await ImageModel.findById(id);
};

const findAllImageById = async (id) => {
  return await ImageModel.find({ _id: id });
};

const handleUpload = async (req, res) => {
  try {
    const files = req.files;

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    const filePromises = Object.values(files).map(async (file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const filename = file.originalname + "-" + uniqueSuffix;
      const filePath = path.join(uploadDir, filename);

      await fs.writeFile(filePath, file.buffer);

      return filePath;
    });

    const filePaths = await Promise.all(filePromises);

    return filePaths;
  } catch (error) {
    throw createHttpError(400, "Error uploading files");
  }
};

const createImage = async (req, res, next) => {
  const uploadDir = path.join(__dirname, "uploads/");
  fs.mkdir(uploadDir, { recursive: true });

  const response = await handleUpload(req, res);
  // const image = await findImageByConditions({ path: data.email });
  // if (image) {
  //   throw createHttpError(404, "Email already taken");
  // }
  console.log(response);
  return await ImageModel.create(response);
};

const deleteImage = async (id) => {
  return await ImageModel.findByIdAndDelete(id);
};

export default {
  createImage,
  findAllImageById,
  findImageById,
  deleteImage,
};
