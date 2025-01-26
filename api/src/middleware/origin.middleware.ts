import type { Request, Response, NextFunction } from "express";
import { env } from "@/env";

export const validateOrigin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader("Access-Control-Allow-Origin", env.ALLOWED_ORIGIN);
  res.setHeader("Vary", "Origin");

  try {
    const header = req.headers.origin ?? req.headers.referer ?? "";
    const origin = new URL(header).origin;

    if (origin === env.ALLOWED_ORIGIN) {
      next();
    } else {
      throw new Error(`Cannot access API from ${origin}`);
    }
  } catch (error) {
    res.status(403).json({
      message: "Forbidden",
    });
  }
};
