import express from "express";

// User routes
import userEventsRouter from "./events.route";
import sessionsRouter from "./sessions.route";

// Admin routes
import adminEventsRouter from "./admin/admin-events.route";
import dashboardRouter from "./admin/dashboard.route";

// API router
const apiRouter = express.Router();

apiRouter.use("/events", userEventsRouter);
apiRouter.use("/sessions", sessionsRouter);

apiRouter.use("/admin/events", adminEventsRouter);
apiRouter.use("/admin/dashboard", dashboardRouter);

export default apiRouter;
