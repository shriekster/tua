import express from "express";
import cookieParser from "cookie-parser";
import { httpLogger } from "./middleware/logger";
import indexRouter from "./routes/index";

import "dotenv/config";

const app = express();

// Middleware
app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routing
app.use("/api/events", indexRouter);

export default app;
