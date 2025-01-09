CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `index:sessions:user_id` ON `sessions` (`user_id`);--> statement-breakpoint
ALTER TABLE `users` ADD `created_at` integer DEFAULT (current_timestamp, 'localtime');