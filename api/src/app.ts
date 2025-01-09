import express from "express";
import cookieParser from "cookie-parser";
import { httpLogger } from "./middleware/logger";
import "dotenv/config";
import apiRouter from "./routes";

const app = express();

// Middleware
app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routing
app.use("/api", apiRouter);

export default app;

// TODO: add middlewares like cors and helmet
