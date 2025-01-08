import express from "express";
import { createSession } from "better-sse";

const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  const session = await createSession(req, res);
  let counter = 0;

  setInterval(() => {
    if (session.isConnected) {
      session.push(counter, "counter", "some-id");
      counter++;
    }
  }, 1000);
});

export default router;
