import {
  createOrUpdateCachedSession,
  getCachedSession,
  deleteCachedSession,
} from "./cache.service";
import {
  createDatabaseSession,
  getDatabaseSession,
  deleteDatabaseSession,
  updateDatabaseSession,
} from "./db.service";

import { generateId } from "@/lib/ulid";
import { encodeHex } from "@/lib/utils";
import type { Session } from "@/db/schema";
import { env } from "@/env";

const { DEFAULT_SESSION_DURATION } = env;

export type SessionWithToken =
  | { session: Session; token: string }
  | { session: null; token: null };

export const createSession = async (
  userId: number
): Promise<SessionWithToken> => {
  const token = generateId();
  const sessionId = encodeHex(token);
  const sessionExpiresAt = new Date(Date.now() + DEFAULT_SESSION_DURATION);

  const session = await createDatabaseSession(
    sessionId,
    userId,
    sessionExpiresAt
  );

  await createOrUpdateCachedSession(
    sessionId,
    session,
    DEFAULT_SESSION_DURATION
  );

  return !!session
    ? {
        session,
        token,
      }
    : {
        session: null,
        token: null,
      };
};

export const getSession = async (sessionId?: string) => {
  if (!sessionId) {
    return null;
  }

  const session =
    (await getCachedSession(sessionId)) ??
    (await getDatabaseSession(sessionId));

  return session ?? null;
};

export const updateSession = async (
  sessionId: string,
  session: Session,
  ttl?: number
) => {
  const updatedSession = await updateDatabaseSession(sessionId, session);
  await createOrUpdateCachedSession(sessionId, updatedSession, ttl);

  return updatedSession;
};

export const deleteSession = async (sessionId: string): Promise<void> => {
  await deleteCachedSession(sessionId);
  await deleteDatabaseSession(sessionId);
};

export type SessionValidationResult = Session | null;
