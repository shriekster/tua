import express from "express";
import { createCustomSession } from "@/lib/sse";

const router = express.Router();

router.get("/", async function (req, res) {
  const session = await createCustomSession(req, res, "admins");
  let counter = 0;
  console.debug({ cookies: req.cookies });
  setInterval(() => {
    if (session.isConnected) {
      session.push(counter, "counter", "some-id");
      counter++;
    }
  }, 1000);
});

export default router;
