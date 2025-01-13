import express from "express";
import { verify } from "@node-rs/argon2";

import { validateLogin } from "@/middleware/validation/login";

import { env } from "@/env";

const router = express.Router();

router.post("/", validateLogin, async function (req, res) {
  res.json({});
});

export default router;
