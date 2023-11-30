import { Router } from "express";
const route = Router();
import {
  createImage,
  findImageById,
  deleteImage,
  findAllImageById,
} from "../Controllers/image.controller";
import multer from "multer";

route.get("/:id", findAllImageById); // get one
route.get("/:id", findImageById); // get all
route.post("/", createImage); // create
route.delete("/:id", deleteImage); // delete

export default route;
