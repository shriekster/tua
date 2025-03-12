import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
  index,
  real,
} from "drizzle-orm/sqlite-core";
import { type InferSelectModel, sql } from "drizzle-orm";

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userName: text("user_name").notNull(),
    password: text("password").notNull(),
    displayName: text("display_name").notNull(),
    phoneNumber: text("phone_number").notNull(),
    isPublicContact: integer("is_public_contact", { mode: "boolean" }).default(
      false
    ),
    createdAt: integer("created_at", { mode: "timestamp" }).default(
      sql`(unixepoch())`
    ),
    updatedAt: integer("updated_at", { mode: "timestamp" }),
  },
  (table) => [
    uniqueIndex("unique_index:users:user_name").on(table.userName),
    uniqueIndex("unique_index:users:phone_number").on(table.phoneNumber),
  ]
);

export const sessions = sqliteTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    expiresAt: integer("expires_at", {
      mode: "timestamp",
    }).notNull(),
  },
  (table) => [index("index:sessions:user_id").on(table.userId)]
);

export const personnelCategories = sqliteTable(
  "personnel_categories",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    displayName: text("display_name").notNull(),
  },
  (table) => [
    uniqueIndex("unique_index:personnel_categories:name").on(table.name),
    uniqueIndex("unique_index:personnel_categories:display_name").on(
      table.displayName
    ),
  ]
);

export const locations = sqliteTable("locations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  lat: real("latitude").notNull(),
  lon: real("longitude").notNull(),
  name: text("name").notNull(),
  address: text("address").notNull(),
});

export const dates = sqliteTable(
  "dates",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    day: text("day").notNull(),
    fullyBooked: integer("fully_booked", { mode: "boolean" }),
    locationId: integer("location_id").references(() => locations.id),
  },
  (table) => [index("index:dates:location_id").on(table.locationId)]
);

export const timeRanges = sqliteTable(
  "time_ranges",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    startTime: text("start_time").notNull(),
    endTime: text("end_time").notNull(),
    availableSeats: integer("available_seats").default(20),
    bookedSeats: integer("booked_seats").default(0),
    published: integer("published", { mode: "boolean" }).default(false),
    dateId: integer("date_id").references(() => dates.id, {
      onDelete: "restrict",
    }),
    personnelCategoryId: integer("personnel_category_id").references(
      () => personnelCategories.id,
      {
        onDelete: "restrict",
        onUpdate: "cascade",
      }
    ),
  },
  (table) => [
    index("index:time_ranges:date_id").on(table.dateId),
    index("index:time_ranges:personnel_category_id").on(
      table.personnelCategoryId
    ),
  ]
);

export const phoneNumbers = sqliteTable(
  "phone_numbers",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    number: text("number").notNull(),
  },
  (table) => [uniqueIndex("unique_index:phone_numbers:number").on(table.number)]
);

export const appointments = sqliteTable(
  "appointments",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    phoneNumberId: integer("phone_number_id").references(
      () => phoneNumbers.number,
      {
        onDelete: "set null",
      }
    ),
    timeRangeId: integer("time_range_id").references(() => timeRanges.id, {
      onDelete: "restrict",
    }),
  },
  (table) => [
    index("index:appointments:phone_number_id").on(table.phoneNumberId),
    index("index:appointments:time_range_id").on(table.timeRangeId),
  ]
);

export const participants = sqliteTable(
  "participants",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    isAdult: integer("is_adult", { mode: "boolean" }),
    createdFromPhoneNumber: integer("created_from_phone_number").references(
      () => phoneNumbers.id,
      {
        onDelete: "set null",
      }
    ),
  },
  (table) => [
    index("index:participants:first_name").on(table.firstName),
    index("index:participants:last_name").on(table.lastName),
    index("index:participants:created_from_phone_number").on(
      table.createdFromPhoneNumber
    ),
  ]
);

export const appointmentParticipants = sqliteTable(
  "appointment_participants",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    appointmentId: integer("appointment_id").references(() => appointments.id, {
      onDelete: "restrict",
    }),
    participantId: integer("participant_id").references(() => participants.id, {
      onDelete: "set null",
    }),
  },
  (table) => [
    index("index:appointment_participants:appointment_id").on(
      table.appointmentId
    ),
    index("index:appointment_participants:participant_id").on(
      table.participantId
    ),
  ]
);

export const notifications = sqliteTable(
  "notifications",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    externalId: text("external_id"),
    text: text("text").notNull(),
    sent: integer("sent", { mode: "boolean" }),
    appointmentId: integer("appointment_id").references(() => appointments.id, {
      onDelete: "set null",
    }),
  },
  (table) => [
    uniqueIndex("unique_index:notifications:appointment_id").on(
      table.appointmentId
    ),
  ]
);

export const settings = sqliteTable(
  "settings",
  {
    key: text("key").notNull(),
    value: text("value"),
  },
  (table) => [uniqueIndex("unique_index:settings:key").on(table.key)]
);

export type User = InferSelectModel<typeof users>;
export type Session = InferSelectModel<typeof sessions>;
export type PersonnelCategory = InferSelectModel<typeof personnelCategories>;
export type Location = InferSelectModel<typeof locations>;
export type Date = InferSelectModel<typeof dates>;
export type TimeRange = InferSelectModel<typeof timeRanges>;
export type PhoneNumber = InferSelectModel<typeof phoneNumbers>;
export type Appointment = InferSelectModel<typeof appointments>;
export type Participant = InferSelectModel<typeof participants>;
export type AppointmentParticipant = InferSelectModel<
  typeof appointmentParticipants
>;
export type Notification = InferSelectModel<typeof notifications>;
export type Setting = InferSelectModel<typeof settings>;
