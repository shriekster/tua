import { db } from "@/db";
import { users, sessions } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";

export const addUser = db
  .insert(users)
  .values({
    userName: sql.placeholder("userName"),
    password: sql.placeholder("password"),
    displayName: sql.placeholder("displayName"),
    phoneNumber: sql.placeholder("phoneNumber"),
    isPublicContact: sql.placeholder("isPublicContact"),
  })
  .returning()
  .prepare();

export const updateUserContactInformation = db
  .update(users)
  .set({
    displayName: `${sql.placeholder("displayName")}`,
    phoneNumber: `${sql.placeholder("phoneNumber")}`,
  })
  .where(eq(users.userName, sql.placeholder("userName")))
  .returning()
  .prepare();

export const updateUserPassword = db
  .update(users)
  .set({
    password: `${sql.placeholder("password")}`,
  })
  .where(eq(users.userName, sql.placeholder("userName")))
  .returning()
  .prepare();

export const queryUser = db
  .select()
  .from(users)
  .where(eq(users.userName, sql.placeholder("userName")))
  .prepare();

export const addSession = db
  .insert(sessions)
  .values({
    id: sql.placeholder("id"),
    userId: sql.placeholder("userId"),
    expiresAt: sql.placeholder("expiresAt"),
  })
  .returning()
  .prepare();

export const querySessionForUser = db
  .select({ user: users, session: sessions })
  .from(sessions)
  .innerJoin(users, eq(sessions.userId, users.id))
  .where(eq(sessions.id, sql.placeholder("sessionId")))
  .prepare();

export const updateSession = db
  .update(sessions)
  .set({
    expiresAt: sql`${sql.placeholder("expiresAt")}`,
  })
  .where(eq(sessions.id, sql.placeholder("sessionId")))
  .returning()
  .prepare();

export const deleteSession = db
  .delete(sessions)
  .where(eq(sessions.id, sql.placeholder("sessionId")))
  .returning()
  .prepare();
