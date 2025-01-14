import express from "express";

import eventsRouter from "./events";
import sessionsRouter from "./sessions";

// API router
const apiRouter = express.Router();

apiRouter.use("/events", eventsRouter);
apiRouter.use("/sessions", sessionsRouter);

export default apiRouter;
