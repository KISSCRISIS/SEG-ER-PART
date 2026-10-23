CREATE TABLE `emailCredentials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`email` varchar(320) NOT NULL,
	`passwordHash` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `emailCredentials_id` PRIMARY KEY(`id`),
	CONSTRAINT `emailCredentials_userId_unique` UNIQUE(`userId`),
	CONSTRAINT `emailCredentials_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `learningProfiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`professionalTrack` varchar(96) NOT NULL,
	`country` varchar(96),
	`graduationYear` int,
	`preferredLanguage` enum('en','ar') NOT NULL DEFAULT 'en',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `learningProfiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `learningProfiles_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
ALTER TABLE `emailCredentials` ADD CONSTRAINT `emailCredentials_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `learningProfiles` ADD CONSTRAINT `learningProfiles_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;