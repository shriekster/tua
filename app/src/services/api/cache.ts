import { type Cache, createCache } from "cache-manager";
import { SESSION_KEY_PREFIX, ONLINE_USERS_KEY } from "@/constants/api";
import type { Session } from "@/db/schema";

class CacheService {
  private static instance: CacheService;
  private cache: Cache;

  private constructor() {
    this.cache = createCache();
  }

  static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }

    return CacheService.instance;
  }

  async setSession(sessionId: string, session?: Session | null, ttl?: number) {
    if (!session) {
      return null;
    }

    const sessionKey = `${SESSION_KEY_PREFIX}${sessionId}`;

    try {
      const cachedSession = await this.cache.set(sessionKey, session, ttl);

      return cachedSession;
    } catch (error) {
      return null;
    }
  }

  async getSession(sessionId?: string) {
    if (!sessionId) {
      return null;
    }

    const sessionKey = `${SESSION_KEY_PREFIX}${sessionId}`;

    try {
      const session = await this.cache.get<Session>(sessionKey);

      if (!session) {
        return null;
      }

      return {
        ...session,
        expiresAt: new Date(session.expiresAt), // this is due to `expiresAt` being a string when retrieved from cache
      };
    } catch (error) {
      return null;
    }
  }

  async deleteSession(sessionId?: string) {
    if (!sessionId) {
      return false;
    }

    const sessionKey = `${SESSION_KEY_PREFIX}${sessionId}`;

    try {
      const isDeleted = await this.cache.del(sessionKey);

      return isDeleted;
    } catch (error) {
      return false;
    }
  }

  async getOnlineUsers() {
    try {
      const onlineUsers = await this.cache.get<number>(ONLINE_USERS_KEY);
      console.log({ onlineUsers });

      if (onlineUsers == null) {
        return 0;
      }

      return onlineUsers;
    } catch (error) {
      return 0;
    }
  }

  async setOnlineUsers(count: number) {
    try {
      const onlineUsers = await this.cache.set(ONLINE_USERS_KEY, count);

      return onlineUsers;
    } catch (error) {
      return null;
    }
  }
}

export const cacheService = CacheService.getInstance();
