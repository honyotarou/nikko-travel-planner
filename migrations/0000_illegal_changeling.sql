CREATE TABLE `spot_reviews` (
	`id` integer PRIMARY KEY NOT NULL,
	`spot_id` integer,
	`rating` integer NOT NULL,
	`comment` text,
	`age_group` text,
	`visit_date` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`spot_id`) REFERENCES `tourist_spots`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tourist_spots` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`category` text NOT NULL,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL,
	`duration` integer NOT NULL,
	`age_group` text,
	`season` text,
	`weather_preference` text,
	`popularity` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `user_plans` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` text,
	`name` text NOT NULL,
	`duration` text NOT NULL,
	`group_size` integer NOT NULL,
	`age_group` text NOT NULL,
	`transportation` text NOT NULL,
	`selected_spots` text,
	`schedule` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `weather_cache` (
	`id` integer PRIMARY KEY NOT NULL,
	`date` text NOT NULL,
	`temperature` real,
	`humidity` integer,
	`weather_main` text,
	`description` text,
	`icon` text,
	`wind_speed` real,
	`precipitation` real,
	`cached_at` text NOT NULL
);
