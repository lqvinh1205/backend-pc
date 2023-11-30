import { Router } from "express";
import {
  register,
  login,
  refreshToken,
  logout,
} from "../Controllers/auth.controller";
import validate from "../Middlewares/validate";
import { userCreate, login as _login } from "../Validations/users.validation";

const route = Router();
route.post("/register", validate(userCreate), register);

route.post("/login", validate(_login), login);

route.post("/refresh-token", refreshToken);

route.delete("/logout", logout);

export default route;
