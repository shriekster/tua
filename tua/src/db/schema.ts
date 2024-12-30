import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, check } from "drizzle-orm/sqlite-core";

// TODO: add indexes where necessary
// TODO: finish tables

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userName: text("user_name").notNull(),
    displayName: text("display_name").notNull(),
    phoneNumber: text("phone_number").notNull(),
  },
  (table) => [
    check(
      "valid_phone_number",
      sql`${table.phoneNumber} LIKE '07%' AND LENGTH(${table.phoneNumber}) = 10` // TODO: review this
    ),
  ]
);

export const personnelCategories = sqliteTable("personnel_categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  displayName: text("display_name").notNull(),
});

export const participants = sqliteTable("participants", {
  id: integer().primaryKey({ autoIncrement: true }),
});

// remaining tables: locations, dates, time_ranges, appointments, notifications (old name was `messages`)
