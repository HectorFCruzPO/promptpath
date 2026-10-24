CREATE TABLE `contributions` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`prompt_id` text,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`content` text NOT NULL,
	`reason` text NOT NULL,
	`author_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL
);
