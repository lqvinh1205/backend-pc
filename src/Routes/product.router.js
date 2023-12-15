import { Router } from "express";
const route = Router();
import {
  getListProduct,
  createProduct,
  findProductById,
  updateProduct,
  deleteProduct,
} from "../Controllers/product.controller";

route.get("/", getListProduct); // list
route.post("/", createProduct); // create
route.get("/:id", findProductById); // get detail
route.patch("/:id", updateProduct); // update
route.delete("/:id", deleteProduct); // delete

export default route;
