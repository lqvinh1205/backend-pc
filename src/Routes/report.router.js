import { Router } from "express";
const route = Router();
import {
  getListInventory,
  getReportDashboard,
} from "../Controllers/report.controller";

route.get("/inventory", getListInventory);
route.get("/dashboard", getReportDashboard);

export default route;
