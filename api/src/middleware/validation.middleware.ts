import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorObj = Object.create(null);

        for (const issue of error.errors) {
          errorObj[issue.path.toString()] = issue.message;
        }

        res.status(400).json({ message: "Invalid data", details: errorObj });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  };
}
