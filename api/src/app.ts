import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { logger } from "./middleware/logger.middleware";
import { validateOrigin } from "./middleware/origin.middleware";

import apiRouter from "./routes";

const app = express();

app.disable("x-powered-by");

// Middleware
app.use(logger);
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
