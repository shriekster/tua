import express from "express";
import { verify, hash } from "@node-rs/argon2";

import { validateLogin } from "@/middleware/validation/login";
import { queryUser } from "@/db/statements";
import { delay } from "@/lib/utils";

import { env } from "@/env";

const router = express.Router();

router.post("/", validateLogin, async function (req, res) {
  await delay(500);

  const { username: userName, password } = req.body as {
    username: string;
    password: string;
  };

  const hashed = await hash(password);

  console.debug({ hashed });

  const userInfo = await queryUser.get({
    userName,
  });
  console.debug({ userInfo });
  if (!userInfo) {
    res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    const isCorrectPassword = await verify(userInfo.password, password);

    if (isCorrectPassword) {
      res.json({
        hello: "world",
      });
    }
  }
});

export default router;
