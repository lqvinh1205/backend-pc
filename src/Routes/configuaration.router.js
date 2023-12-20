import { Router } from "express";
const route = Router();
import {
  getListConfiguaration,
  createConfiguaration,
} from "../Controllers/configuaration.controller";

route.get("/", getListConfiguaration); // list
route.post("/", createConfiguaration); // create

export default route;
