import { createCache } from "cache-manager";
import { SESSION_KEY_PREFIX } from "@/lib/constants";
import type { Session } from "@/db/schema";

// Memory store by default
export const cache = createCache();

export const createOrUpdateCachedSession = async (
  sessionId: string,
  session?: Session | null,
  ttl?: number
) => {
  if (!session) {
    return null;
  }

  const sessionKey = `${SESSION_KEY_PREFIX}${sessionId}`;

  try {
    const cachedSession = await cache.set(sessionKey, session, ttl);

    return cachedSession;
  } catch (error) {
    return null;
  }
};

export const getCachedSession = async (sessionId?: string) => {
  if (!sessionId) {
    return null;
  }

  const sessionKey = `${SESSION_KEY_PREFIX}${sessionId}`;

  try {
    const session = await cache.get<Session>(sessionKey);

    if (!session) {
      return null;
    }

    return {
      ...session,
      expiresAt: new Date(session.expiresAt),
    };
  } catch (error) {
    return null;
  }
};

export const deleteCachedSession = async (sessionId?: string) => {
  if (!sessionId) {
    return false;
  }

  const sessionKey = `${SESSION_KEY_PREFIX}${sessionId}`;

  try {
    const isDeleted = await cache.del(sessionKey);

    return isDeleted;
  } catch (error) {
    return false;
  }
};
