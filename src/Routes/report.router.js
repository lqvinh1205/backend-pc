import { Router } from "express";
const route = Router();
import { getListInventory } from "../Controllers/report.controller";

route.get("/inventory", getListInventory);

export default route;
