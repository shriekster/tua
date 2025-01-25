import { Request } from "express";

// Extend the Request interface
declare global {
  namespace Express {
    interface Request {
      sessionId?: string;
    }
  }
}

export {};
