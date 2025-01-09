import { encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import {
  addSession,
  deleteSession,
  querySessionForUser,
  updateSession,
} from "@/db/statements";
import { ulid } from "./ulid";
import type { User, Session } from "@/db/schema";

// Default session duration is 7 days
const DEFAULT_SESSION_DURATION = Number(
  process.env.SESSION_DURATION ?? 604800000
);

export const generateSessionToken = (): string => {
  const token = ulid().toLowerCase();
  return token;
};

export const createSession = async (
  token: string,
  userId: number
): Promise<Session> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const [session] = await addSession.execute({
    id: sessionId,
    userId,
    expirestAt: new Date(Date.now() + DEFAULT_SESSION_DURATION),
  });

  return session;
};

export const validateSessionToken = async (
  token: string
): Promise<SessionValidationResult> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const userSession = await querySessionForUser.get({
    sessionId,
  });

  if (!userSession) {
    return { session: null, user: null };
  }

  const { user, session } = userSession;

  const now = Date.now();
  const sessionExpiresAt = session.expiresAt.getTime();

  if (now >= sessionExpiresAt) {
    await deleteSession.execute({
      sessionId,
    });

    return { session: null, user: null };
  }

  if (now >= sessionExpiresAt - DEFAULT_SESSION_DURATION / 2) {
    const updatedExpirationDate = new Date(now + DEFAULT_SESSION_DURATION);

    const [updatedSession] = await updateSession.execute({
      id: session.id,
      expiresAt: updatedExpirationDate,
    });

    return { session: updatedSession, user };
  }

  return { session, user };
};

export const invalidateSession = async (sessionId: string): Promise<void> => {
  await deleteSession.execute({
    sessionId,
  });
};

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
