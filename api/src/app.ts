import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { httpLogger } from "./middleware/logger";
import { validateOrigin } from "./middleware/validation/origin";

import apiRouter from "./routes";

const app = express();

app.disable("x-powered-by");

// Middleware
app.use(httpLogger);
app.use(
  helmet({
    strictTransportSecurity: false,
    xPoweredBy: false,
  })
);
// app.use(validateOrigin);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routing
app.use("/api", apiRouter);

export default app;
