CREATE TABLE `emailVerificationCodes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`codeHash` varchar(128) NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`attempts` int NOT NULL DEFAULT 0,
	`lastSentAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `emailVerificationCodes_id` PRIMARY KEY(`id`),
	CONSTRAINT `emailVerificationCodes_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `emailVerifiedAt` timestamp;--> statement-breakpoint
ALTER TABLE `emailVerificationCodes` ADD CONSTRAINT `emailVerificationCodes_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;