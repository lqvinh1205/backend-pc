import { Router } from "express";
const route = Router();
import {
  getListUser,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
} from "../Controllers/user.controller";

route.get("/", getListUser); // list
route.post("/", createUser); // create
route.get("/:id", findUserById); // get detail
route.patch("/:id", updateUser); // update
route.delete("/:id", deleteUser); // delete

export default route;
