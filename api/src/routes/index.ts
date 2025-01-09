import express from "express";

import eventsRouter from "./events";

// API router
const apiRouter = express.Router();

apiRouter.use("/events", eventsRouter);

export default apiRouter;
