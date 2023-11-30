import express from "express";
import helmet, { crossOriginResourcePolicy } from "helmet";
import morgan from "morgan";
import { connect, connection } from "mongoose";
import { createServer } from "http";
import cors from "cors";

//Import router
import UserRouter from "./Routes/users.router";
import AuthRouter from "./Routes/auth.router";
import BrandRouter from "./Routes/brand.router";
import ConfiguarationRouter from "./Routes/configuaration.router";
import ImagesRouter from "./Routes/image.router";

//Middleware
import { checkAuthentication } from "./Middlewares/token";
import logEvents from "./Helpers/logEvent";

const app = express();
const server = createServer(app);

app.use(
  cors({
    origin: "*",
  })
);

// su dung cac middlaware
app.use(morgan("tiny"));
app.use(helmet());
app.use(crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// su dung cac route
app.use("/v1", AuthRouter);
app.use("/v1/users", UserRouter);
app.use("/v1/brands", BrandRouter);
app.use("/v1/configuaration", ConfiguarationRouter);
app.use("/v1/images", ImagesRouter);

app.use((req, res, next) => {
  next(createHttpError(404, "Not found"));
});

app.use((err, req, res, next) => {
  logEvents(`${req.url} --- ${req.method} --- ${err.message}`);
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

connect("mongodb://127.0.0.1:27017/backend-pc")
  .then(() => console.log("Database connect success"))
  .catch((err) => console.log("Database connect faild"));

connection.on("connected", () => console.log("Mongoose connected"));
connection.on("error", (err) => console.log(err.message));
connection.on("disconnected", () => console.log("Mongoose disconnected"));

// Bắt sự kiện disconnect
process.on("SIGINT", async () => {
  await connection.close();
  process.exit(0);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Server is running port", PORT);
});
