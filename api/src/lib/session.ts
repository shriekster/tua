import { encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { cache } from "./cache";
import { SESSION_KEY_PREFIX, USER_SESSION_KEY_PREFIX } from "./constants";
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

  const sessionKey = `${SESSION_KEY_PREFIX}${sessionId}`;
  await cache.set(sessionKey, session, DEFAULT_SESSION_DURATION);

  return session;
};

export const validateSessionToken = async (
  token: string
): Promise<SessionValidationResult> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const userSessionKey = `${USER_SESSION_KEY_PREFIX}${sessionId}`;

  let userSession: SessionValidationResult | undefined | null = await cache.get(
    userSessionKey
  );

  if (!userSession) {
    userSession = await querySessionForUser.get({
      sessionId,
    });
  }

  if (!userSession) {
    return { session: null, user: null };
  }

  const { user, session } = userSession;

  await cache.set(userSessionKey, { session: session!, user: user! });

  const now = Date.now();
  const sessionExpiresAt = session!.expiresAt.getTime();

  if (now >= sessionExpiresAt) {
    await cache.del(userSessionKey);

    await deleteSession.execute({
      sessionId,
    });

    return { session: null, user: null };
  }

  if (now >= sessionExpiresAt - DEFAULT_SESSION_DURATION / 2) {
    const updatedExpirationDate = new Date(now + DEFAULT_SESSION_DURATION);

    const [updatedSession] = await updateSession.execute({
      id: session!.id,
      expiresAt: updatedExpirationDate,
    });

    await cache.set(userSessionKey, { session: updatedSession, user: user! });

    return { session: updatedSession, user: user! };
  }

  return { session: session!, user: user! };
};

export const invalidateSession = async (sessionId: string): Promise<void> => {
  const userSessionKey = `${USER_SESSION_KEY_PREFIX}${sessionId}`;

  await cache.del(userSessionKey);

  await deleteSession.execute({
    sessionId,
  });
};

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
