import { parseLoginData } from "@/lib/validation/login";
import type { Request, Response, NextFunction } from "express";

// TODO: use zod
export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = parseLoginData(req.body);

  if (result.success) {
    next();
  } else {
    res.status(400).json({
      message: "Missing or invalid username / password",
    });
  }
};
