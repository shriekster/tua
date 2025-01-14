import express from "express";

import userEventsRouter from "./events";
import sessionsRouter from "./sessions";

import adminEventsRouter from "./admin/events";

// API router
const apiRouter = express.Router();

apiRouter.use("/events", userEventsRouter);
apiRouter.use("/sessions", sessionsRouter);

apiRouter.use("/admin/events", adminEventsRouter);

export default apiRouter;
