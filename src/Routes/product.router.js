import { Router } from "express";
const route = Router();
import {
  getListProduct,
  createProduct,
  findProductById,
  updateProduct,
  deleteProduct,
} from "../Controllers/product.controller";
import upload from "../Middlewares/uploadMiddlware";

route.get("/", getListProduct); // list
route.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createProduct
); // create
route.get("/:id", findProductById); // get detail
route.patch(
  "/:id",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  updateProduct
); // update
route.delete("/:id", deleteProduct); // delete

export default route;
