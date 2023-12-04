import { Router } from "express";
const route = Router();
import {
  getListBill,
  createBill,
  findBillById,
  updateBill,
  deleteBill,
} from "../Controllers/bill.controller";

route.get("/", getListBill); // list
route.post("/", createBill); // create
route.get("/:id", findBillById); // get detail
route.patch("/:id", updateBill); // update
route.delete("/:id", deleteBill); // delete

export default route;
