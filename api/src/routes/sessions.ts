import express from "express";
import { verify } from "@node-rs/argon2";

import { validateLogin } from "@/middleware/validation/login";
import { verifyCredentials } from "@/lib/verifyCredentials";
import { delay } from "@/lib/utils";
import { createSession, generateSessionToken } from "@/lib/session";
import { LOGIN_DURATION } from "@/lib/constants";
import { env } from "@/env";

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

    res.cookie("session", token, {
      expires: session.expiresAt,
      path: "/api/admin",
      // sameSite: "strict",
      sameSite: "strict",
      httpOnly: true,
    });

    const elapsed = performance.now() - start;

    await delay(LOGIN_DURATION - elapsed);

    res.status(200).json({
      message: "Hello",
    });
  }

  // if (!user) {
  //   await delay(500);

  //   res.status(401).json({
  //     message: "Unauthorized",
  //   });
  // } else {
  //   const now = performance.now();
  //   const isCorrectPassword = await verify(user.password, password);
  //   console.debug({ took: performance.now() - now });

  //   if (isCorrectPassword) {
  //     const token = generateSessionToken();
  //     const session = await createSession(token, user.id);
  //     res.cookie("session", token, {
  //       expires: session.expiresAt,
  //       path: "/api/admin",
  //       // sameSite: "strict",
  //       sameSite: "strict",
  //       httpOnly: true,
  //     });

  //     res.status(200).json({
  //       message: "Hello",
  //     });
  //   } else {
  //     res.status(401).json({
  //       message: "Unauthorized",
  //     });
  //   }
  // }
});

export default router;
