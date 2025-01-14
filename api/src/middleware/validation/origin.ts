import { parseOrigin } from "@/lib/validation/origin";
import type { Request, Response, NextFunction } from "express";
import { env } from "@/env";

export const validateOrigin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader("Access-Control-Allow-Origin", env.ALLOWED_ORIGIN);
  res.setHeader("Vary", "Origin");

  const origin = req.headers.origin ?? req.headers["x-origin"];

  const result = parseOrigin(origin);

  if (result.success && result.output === env.ALLOWED_ORIGIN) {
    next();
  } else {
    console.error(result.issues);
    res.status(403).json({
      message: "Forbidden",
    });
  }
};
