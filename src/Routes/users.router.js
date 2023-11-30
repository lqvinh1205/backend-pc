import { Router } from "express";
const route = Router();
import {
  getListUser,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
} from "../Controllers/user.controller";
import validate from "../Middlewares/validate";
import { userCreate, userUpdate } from "../Validations/users.validation";

route.get("/", getListUser);
route.post("/", validate(userCreate), createUser);
route.get("/:id", findUserById);
route.patch("/:id", validate(userUpdate), updateUser);
route.delete("/:id", deleteUser);

export default route;
