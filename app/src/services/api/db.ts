import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "@/db";
import {
  addSession,
  addUser,
  querySessionForUser,
  queryUser,
  updateSessionExpirationDate,
  deleteSession,
} from "@/db/statements";
import type { Session } from "@/db/schema";
import {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  ADMIN_DISPLAY_NAME,
  ADMIN_PHONE_NUMBER,
} from "astro:env/server";

export const runMigrations = async () => {
  console.log("Running migrations...");

  try {
    await migrate(db, {
      migrationsFolder: "./drizzle",
    });

    console.log("Migrations finished successfully.");
  } catch (error) {
    console.error("🚨 Migration error:\n", error);
  }
};

class DbService {
  private static instance: DbService;
  private constructor() {}

  static getInstance(): DbService {
    if (!DbService.instance) {
      DbService.instance = new DbService();
    }

    return DbService.instance;
  }

  // TODO: find a good way to check if the database is seeded
  async seed() {
    console.log("Seeding database...");
    let skipSeeding = false;

    try {
      const userInfo = await queryUser.get({
        userName: ADMIN_USERNAME,
      });

      if (!userInfo) {
        await addUser.execute({
          userName: ADMIN_USERNAME,
          password: ADMIN_PASSWORD,
          displayName: ADMIN_DISPLAY_NAME,
          phoneNumber: ADMIN_PHONE_NUMBER,
          isPublicContact: true,
        });
      } else {
        skipSeeding = true;
      }

      if (!skipSeeding) {
        console.log("Seeding finished successfully.");
      } else {
        console.log("Skipped seeding, database already seeded.");
      }
    } catch (error) {
      console.error("🚨 Seeding error:\n", error);
    }
  }

  async createSession(id: string, userId: number, expiresAt: Date) {
    try {
      const [session] = await addSession.execute({
        id,
        userId,
        expiresAt,
      });

      return session;
    } catch (error) {
      return null;
    }
  }

  async getSession(sessionId?: string) {
    if (!sessionId) {
      return null;
    }

    try {
      const userSession = await querySessionForUser.get({
        sessionId,
      });

      return userSession?.session;
    } catch (error) {
      return null;
    }
  }

  async updateSession(sessionId: string, session: Session) {
    try {
      const [updatedSession] = await updateSessionExpirationDate.execute({
        id: sessionId,
        expiresAt: session.expiresAt,
      });

      return updatedSession;
    } catch (error) {
      return null;
    }
  }

  async deleteSession(sessionId: string) {
    try {
      const [deletedSession] = await deleteSession.execute({
        sessionId,
      });

      return deletedSession;
    } catch (error) {
      return null;
    }
  }

  async getUser(userName?: string) {
    if (!userName) {
      return null;
    }

    try {
      const user = await queryUser.get({
        userName,
      });

      return user;
    } catch (error) {
      return null;
    }
  }
}

export const dbService = DbService.getInstance();
