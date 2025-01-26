import express from "express";
import { verifyCredentials } from "@/services/user.service";
import { createSession, deleteSession } from "@/services/session.service";
import { authorize } from "@/middleware/authorization.middleware";
import { delay } from "@/lib/utils";
import { setSessionCookie, removeSessionCookie } from "@/lib/session";
import { validateData } from "@/middleware/validation.middleware";
import { loginSchema } from "@/schemas/login";
import { LOGIN_DURATION } from "@/lib/constants";

const router = express.Router();

router.post("/", validateData(loginSchema), async function (req, res) {
  const start = performance.now();

  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  const user = await verifyCredentials(username, password);

  if (!user) {
    const elapsed = performance.now() - start;

    await delay(LOGIN_DURATION - elapsed);

    res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    const { session, token } = await createSession(user.id);

    if (session) {
      setSessionCookie(res, token, session);
    }

    const elapsed = performance.now() - start;

    await delay(LOGIN_DURATION - elapsed);

    if (session) {
      res.status(200).json({
        message: "Hello",
      });
    } else {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
});

router.delete("/current", authorize, async function (req, res) {
  await deleteSession(req.sessionId!);

  removeSessionCookie(res);
  console.log({ logout: req.cookies });
  res.status(200).json({
    message: "Bye 👋",
  });
});

export default router;
