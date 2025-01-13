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

  const result = parseOrigin(req.headers.origin);

  if (result.success && result.output === env.ALLOWED_ORIGIN) {
    next();
  } else {
    console.error(result.issues);
    res.status(403).json({
      message: "Forbidden",
    });
  }
};
