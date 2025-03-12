CREATE TABLE `appointment_participants` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`appointment_id` integer,
	`participant_id` integer,
	FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`participant_id`) REFERENCES `participants`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `index:appointment_participants:appointment_id` ON `appointment_participants` (`appointment_id`);--> statement-breakpoint
CREATE INDEX `index:appointment_participants:participant_id` ON `appointment_participants` (`participant_id`);--> statement-breakpoint
CREATE TABLE `appointments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`phone_number_id` integer,
	`time_range_id` integer,
	FOREIGN KEY (`phone_number_id`) REFERENCES `phone_numbers`(`number`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`time_range_id`) REFERENCES `time_ranges`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE INDEX `index:appointments:phone_number_id` ON `appointments` (`phone_number_id`);--> statement-breakpoint
CREATE INDEX `index:appointments:time_range_id` ON `appointments` (`time_range_id`);--> statement-breakpoint
CREATE TABLE `dates` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`day` text NOT NULL,
	`fully_booked` integer,
	`location_id` integer,
	FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `index:dates:location_id` ON `dates` (`location_id`);--> statement-breakpoint
CREATE TABLE `locations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL,
	`name` text NOT NULL,
	`address` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`external_id` text,
	`text` text NOT NULL,
	`sent` integer,
	`appointment_id` integer,
	FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `unique_index:notifications:appointment_id` ON `notifications` (`appointment_id`);--> statement-breakpoint
CREATE TABLE `participants` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`is_adult` integer,
	`created_from_phone_number` integer,
	FOREIGN KEY (`created_from_phone_number`) REFERENCES `phone_numbers`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `index:participants:first_name` ON `participants` (`first_name`);--> statement-breakpoint
CREATE INDEX `index:participants:last_name` ON `participants` (`last_name`);--> statement-breakpoint
CREATE INDEX `index:participants:created_from_phone_number` ON `participants` (`created_from_phone_number`);--> statement-breakpoint
CREATE TABLE `personnel_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`display_name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `unique_index:personnel_categories:name` ON `personnel_categories` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_index:personnel_categories:display_name` ON `personnel_categories` (`display_name`);--> statement-breakpoint
CREATE TABLE `phone_numbers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`number` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `unique_index:phone_numbers:number` ON `phone_numbers` (`number`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `index:sessions:user_id` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE TABLE `settings` (
	`key` text NOT NULL,
	`value` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `unique_index:settings:key` ON `settings` (`key`);--> statement-breakpoint
CREATE TABLE `time_ranges` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`start_time` text NOT NULL,
	`end_time` text NOT NULL,
	`available_seats` integer DEFAULT 20,
	`booked_seats` integer DEFAULT 0,
	`published` integer DEFAULT false,
	`date_id` integer,
	`personnel_category_id` integer,
	FOREIGN KEY (`date_id`) REFERENCES `dates`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`personnel_category_id`) REFERENCES `personnel_categories`(`id`) ON UPDATE cascade ON DELETE restrict
);
--> statement-breakpoint
CREATE INDEX `index:time_ranges:date_id` ON `time_ranges` (`date_id`);--> statement-breakpoint
CREATE INDEX `index:time_ranges:personnel_category_id` ON `time_ranges` (`personnel_category_id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_name` text NOT NULL,
	`password` text NOT NULL,
	`display_name` text NOT NULL,
	`phone_number` text NOT NULL,
	`is_public_contact` integer DEFAULT false,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `unique_index:users:user_name` ON `users` (`user_name`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_index:users:phone_number` ON `users` (`phone_number`);