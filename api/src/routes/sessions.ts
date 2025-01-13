import express from "express";
import { verify } from "@node-rs/argon2";

import { validateLogin } from "@/middleware/validation/login";
import { queryUser } from "@/db/statements";
import { delay } from "@/lib/utils";
import { createSession, generateSessionToken } from "@/lib/session";
import { env } from "@/env";

const router = express.Router();

router.post("/", validateLogin, async function (req, res) {
  const { username: userName, password } = req.body as {
    username: string;
    password: string;
  };

  const user = await queryUser.get({
    userName,
  });

  if (!user) {
    await delay(500);

    res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    const isCorrectPassword = await verify(user.password, password);

    if (isCorrectPassword) {
      const token = generateSessionToken();
      const session = await createSession(token, user.id);
      res.cookie("session", token, {
        expires: session.expiresAt,
        path: "/api/admin",
        // sameSite: "strict",
        sameSite: "lax",
        httpOnly: true,
      });

      res.status(200).json({
        message: "Hello",
      });
    } else {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  }
});

export default router;
