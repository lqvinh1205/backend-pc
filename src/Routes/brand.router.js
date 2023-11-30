import { Router } from "express";
const route = Router();
import {
  getListBrand,
  createBrand,
  findBrandById,
  updateBrand,
  deleteBrand,
} from "../Controllers/brand.controller";

route.get("/", getListBrand); // list
route.post("/", createBrand); // create
route.get("/:id", findBrandById); // get detail
route.patch("/:id", updateBrand); // update
route.delete("/:id", deleteBrand); // delete

export default route;
