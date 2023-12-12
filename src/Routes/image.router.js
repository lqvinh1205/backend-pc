import { Router } from "express";
const route = Router();
import {
  createImage,
  createMultilImages,
  findImageById,
  deleteImage,
  findAllImageById,
} from "../Controllers/image.controller";
import upload from "../Middlewares/uploadMiddlware";

route.get("/:id", findAllImageById); // get one
route.get("/:id", findImageById); // get all
route.post("/single", upload.single("images"), createImage); // create
route.post("/multil", upload.array("images", 10), createMultilImages); // create
route.delete("/:id", deleteImage); // delete

export default route;
