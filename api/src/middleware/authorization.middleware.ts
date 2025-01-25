import type { Request, Response, NextFunction } from "express";
import {
  getSession,
  updateSession,
  deleteSession,
} from "@/services/session.service";
import { setSessionCookie, removeSessionCookie } from "@/lib/session";
import { encodeHex } from "@/lib/utils";
import { env } from "@/env";
const { DEFAULT_SESSION_DURATION } = env;

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionToken = req.cookies?.["session"];
  const sessionId = encodeHex(sessionToken);

  const session = await getSession(sessionId);

  const now = Date.now();
  const sessionExpiresAt = session?.expiresAt?.getTime() ?? 0;

  const sessionMissingOrExpired = !session || now >= sessionExpiresAt;

  if (sessionMissingOrExpired) {
    req.sessionId = undefined;

    await deleteSession(sessionId);

    removeSessionCookie(res);

    res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    const sessionWillExpireSoon =
      now >= sessionExpiresAt - DEFAULT_SESSION_DURATION / 3;

    if (sessionWillExpireSoon) {
      const updatedSessionExpirationDate = new Date(
        now + DEFAULT_SESSION_DURATION
      );

      session.expiresAt = updatedSessionExpirationDate;

      const updatedSession = await updateSession(
        session.id,
        session,
        DEFAULT_SESSION_DURATION
      );

      if (updatedSession) {
        setSessionCookie(res, sessionToken, updatedSession);
      }
    }

    req.sessionId = session.id;

    next();
  }
};
