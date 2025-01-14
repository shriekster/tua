import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "@/db";
import { addUser, queryUser } from "./statements";
import { env } from "@/env";

export const runMigrations = async () => {
  console.debug("Running migrations...");

  let migrationError;
  try {
    await migrate(db, {
      migrationsFolder: "./drizzle",
    });
  } catch (error) {
    migrationError = error;
  }

  if (migrationError) {
    console.error("Migration error:\n", migrationError);
  } else {
    console.log("Migrations finished successfully.");
  }
};

export const seed = async () => {
  console.debug("Seeding database...");

  let seedingError;
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
  } catch (error) {
    seedingError = error;
  }

  if (seedingError) {
    console.error("Seeding error:\n", seedingError);
  } else {
    if (!skipSeeding) {
      console.log("Seeding finished successfully.");
    } else {
      console.log("Skipped seeding, database already seeded.");
    }
  }
};
