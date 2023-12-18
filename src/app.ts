import express, { json } from "express";
import mainRouter from "./routes";
import { handle404Error } from "./middlewares/wrong-url-handler";
import cookieParser from "cookie-parser";
import helmet from "helmet";
const app = express();

app.use(helmet());
app.use(json());
app.use(cookieParser());

app.use("/v1/api", mainRouter);

app.use("*", handle404Error);
export default app;
