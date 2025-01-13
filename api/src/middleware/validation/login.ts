import { parseLoginData } from "@/lib/validation/login";
import type { Request, Response, NextFunction } from "express";

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = parseLoginData(req.body);

  if (result.success) {
    next();
  } else {
    console.error(result.issues);
    res.status(400).json({
      message: "Missing or invalid username / password",
    });
  }
};
