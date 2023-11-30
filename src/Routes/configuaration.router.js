import { Router } from "express";
const route = Router();
import {
  getListConfiguaration,
  createConfiguaration,
  findConfiguarationById,
  updateConfiguaration,
  deleteConfiguaration,
} from "../Controllers/configuaration.controller";

route.get("/", getListConfiguaration); // list
route.post("/", createConfiguaration); // create
route.get("/:id", findConfiguarationById); // get detail
route.patch("/:id", updateConfiguaration); // update
route.delete("/:id", deleteConfiguaration); // delete

export default route;
