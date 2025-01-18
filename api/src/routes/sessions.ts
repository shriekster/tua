import express from "express";

import { validateLogin } from "@/middleware/validation/login";
import { verifyCredentials } from "@/lib/verifyCredentials";
import { delay } from "@/lib/utils";
import {
  createSession,
  generateSessionToken,
  setSessionCookie,
  removeSessionCookie,
} from "@/lib/session";
import { LOGIN_DURATION } from "@/lib/constants";

const router = express.Router();

router.post("/", validateLogin, async function (req, res) {
  const start = performance.now();

  const user = await verifyCredentials(req);

  if (!user) {
    const elapsed = performance.now() - start;

    await delay(LOGIN_DURATION - elapsed);

    res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    const token = generateSessionToken();
    const session = await createSession(token, user.id);

    setSessionCookie(res, session, token);

    const elapsed = performance.now() - start;

    await delay(LOGIN_DURATION - elapsed);

    res.status(200).json({
      message: "Hello",
    });
  }
});

router.delete("/current", async function (req, res) {});

export default router;
