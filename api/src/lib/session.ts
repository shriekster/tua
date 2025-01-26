import type { Response } from "express";

type Session = {
  expiresAt: Date;
};

export const setSessionCookie = (
  res: Response,
  token: string,
  session: Session
) => {
  res.cookie("session", token, {
    expires: session.expiresAt,
    path: "/api",
    sameSite: "strict",
    httpOnly: true,
  });
};

export const removeSessionCookie = (res: Response) => {
  res.cookie("session", "", {
    maxAge: 0,
    path: "/api",
    sameSite: "strict",
    httpOnly: true,
  });
};
