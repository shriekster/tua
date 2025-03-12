import { dbService } from "./db";
import { cacheService } from "./cache";
import { userService } from "@/services/api/user";
import { generateId } from "@/lib/ulid";
import { encodeHex } from "@/lib/utils";
import type { Session } from "@/db/schema";
import { DEFAULT_SESSION_DURATION } from "astro:env/server";

class SessionService {
  private static instance: SessionService;
  private constructor() {}

  static getInstance(): SessionService {
    if (!SessionService.instance) {
      SessionService.instance = new SessionService();
    }

    return SessionService.instance;
  }

  async createSession(userId: number): Promise<SessionWithToken> {
    const token = generateId();
    const sessionId = encodeHex(token);
    const sessionExpiresAt = new Date(Date.now() + DEFAULT_SESSION_DURATION);

    const session = await dbService.createSession(
      sessionId,
      userId,
      sessionExpiresAt
    );

    await cacheService.setSession(sessionId, session, DEFAULT_SESSION_DURATION);

    if (session) {
      return {
        session,
        token,
      };
    }

    return {
      session: null,
      token: null,
    };
  }

  async getSession(sessionId?: string) {
    if (!sessionId) {
      return null;
    }

    const session =
      (await cacheService.getSession(sessionId)) ??
      (await dbService.getSession(sessionId));

    return session ?? null;
  }

  async updateSession(sessionId: string, session: Session, ttl?: number) {
    const updatedSession = await dbService.updateSession(sessionId, session);
    await cacheService.setSession(sessionId, updatedSession, ttl);

    return updatedSession;
  }

  async deleteSession(sessionId: string): Promise<void> {
    await cacheService.deleteSession(sessionId);
    await dbService.deleteSession(sessionId);
  }
}

export type SessionWithToken =
  | { session: Session; token: string }
  | { session: null; token: null };

export type SessionValidationResult = Session | null;

export const sessionService = SessionService.getInstance();
