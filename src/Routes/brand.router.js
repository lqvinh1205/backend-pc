import { Router } from "express";
const route = Router();
import {
  getListBrand,
  createBrand,
  findBrandById,
  updateBrand,
  deleteBrand,
} from "../Controllers/brand.controller";
import upload from "../Utils/uploadMiddlware";

route.get("/", getListBrand); // list
route.post("/", upload.single("images"), createBrand); // create
route.get("/:id", findBrandById); // get detail
route.patch("/:id", upload.single("images"), updateBrand); // update
route.delete("/:id", deleteBrand); // delete

export default route;
