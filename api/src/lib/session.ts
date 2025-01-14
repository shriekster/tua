import { encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { cache } from "./cache";
import { SESSION_KEY_PREFIX } from "./constants";
import {
  addSession,
  deleteSession,
  querySessionForUser,
  updateSession,
} from "@/db/statements";
import { ulid } from "./ulid";
import type { Session } from "@/db/schema";
import { env } from "@/env";

const { DEFAULT_SESSION_DURATION } = env;

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
    expiresAt: new Date(Date.now() + DEFAULT_SESSION_DURATION),
  });

  const sessionKey = `${SESSION_KEY_PREFIX}${sessionId}`;
  await cache.set(sessionKey, session, DEFAULT_SESSION_DURATION);

  return session;
};

export const validateSessionToken = async (
  token: string
): Promise<SessionValidationResult> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const sessionKey = `${SESSION_KEY_PREFIX}${sessionId}`;

  let session: SessionValidationResult | undefined | null = await cache.get(
    sessionKey
  );

  if (!session) {
    try {
      const userSession = await querySessionForUser.get({
        sessionId,
      });

      session = userSession?.session;

      await cache.set(sessionKey, session);
    } catch (error) {
      session = null;
    }
  }

  if (!session) {
    return null;
  }

  const now = Date.now();
  const sessionExpiresAt = session!.expiresAt.getTime();

  if (now >= sessionExpiresAt) {
    await cache.del(sessionKey);

    await deleteSession.execute({
      sessionId,
    });

    return null;
  }

  if (now >= sessionExpiresAt - DEFAULT_SESSION_DURATION / 3) {
    const updatedExpirationDate = new Date(now + DEFAULT_SESSION_DURATION);

    const [updatedSession] = await updateSession.execute({
      id: session!.id,
      expiresAt: updatedExpirationDate,
    });

    await cache.set(sessionKey, updatedSession);

    return updatedSession;
  }

  return session;
};

export const invalidateSession = async (sessionId: string): Promise<void> => {
  const sessionKey = `${SESSION_KEY_PREFIX}${sessionId}`;

  await cache.del(sessionKey);

  await deleteSession.execute({
    sessionId,
  });
};

export type SessionValidationResult = Session | null;
