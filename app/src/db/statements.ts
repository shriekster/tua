import { db } from "@/db";
import { users } from "./schema";
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
  .where(
    and(
      eq(users.userName, sql.placeholder("userName")),
      eq(users.password, sql.placeholder("password"))
    )
  )
  .prepare();
