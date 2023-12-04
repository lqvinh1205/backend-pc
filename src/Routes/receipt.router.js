import { Router } from "express";
const route = Router();
import {
  getListReceipt,
  createReceipt,
  findReceiptById,
  updateReceipt,
  deleteReceipt,
} from "../Controllers/receipt.controller";

route.get("/", getListReceipt); // list
route.post("/", createReceipt); // create
route.get("/:id", findReceiptById); // get detail
route.patch("/:id", updateReceipt); // update
route.delete("/:id", deleteReceipt); // delete

export default route;
