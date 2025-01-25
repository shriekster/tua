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
import { env } from "@/env";
import { Session } from "@/db/schema";

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

// TODO: find a good way to check if the database is seeded
export const seed = async () => {
  console.log("Seeding database...");
  let skipSeeding = false;

  try {
    const userInfo = await queryUser.get({
      userName: env.ADMIN_USERNAME,
    });

    if (!userInfo) {
      await addUser.execute({
        userName: env.ADMIN_USERNAME,
        password: env.ADMIN_PASSWORD,
        displayName: env.ADMIN_DISPLAY_NAME,
        phoneNumber: env.ADMIN_PHONE_NUMBER,
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
};

export const createDatabaseSession = async (
  id: string,
  userId: number,
  expiresAt: Date
) => {
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
};

export const getDatabaseSession = async (sessionId?: string) => {
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
};

export const updateDatabaseSession = async (
  sessionId: string,
  session: Session
) => {
  try {
    const [updatedSession] = await updateSessionExpirationDate.execute({
      id: sessionId,
      expiresAt: session.expiresAt,
    });

    return updatedSession;
  } catch (error) {
    return null;
  }
};

export const deleteDatabaseSession = async (sessionId: string) => {
  try {
    const [deletedSession] = await deleteSession.execute({
      sessionId,
    });

    return deletedSession;
  } catch (error) {
    return null;
  }
};

export const getDatabaseUser = async (userName?: string) => {
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
};
