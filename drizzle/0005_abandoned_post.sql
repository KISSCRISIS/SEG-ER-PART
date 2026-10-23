CREATE TABLE `residentQuestionAttempts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`questionId` varchar(160) NOT NULL,
	`family` enum('FRCEM','HIPPO') NOT NULL,
	`chapterNumber` int NOT NULL,
	`selectedAnswer` varchar(8) NOT NULL,
	`correct` int NOT NULL,
	`attemptedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `residentQuestionAttempts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `residentStudyProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`family` enum('FRCEM','HIPPO') NOT NULL,
	`chapterNumber` int NOT NULL,
	`completed` int NOT NULL DEFAULT 0,
	`lastReadAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `residentStudyProgress_id` PRIMARY KEY(`id`),
	CONSTRAINT `residentStudyProgress_user_family_chapter_unique` UNIQUE(`userId`,`family`,`chapterNumber`)
);
--> statement-breakpoint
ALTER TABLE `residentQuestionAttempts` ADD CONSTRAINT `residentQuestionAttempts_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `residentStudyProgress` ADD CONSTRAINT `residentStudyProgress_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `residentQuestionAttempts_user_idx` ON `residentQuestionAttempts` (`userId`,`attemptedAt`);--> statement-breakpoint
CREATE INDEX `residentQuestionAttempts_question_idx` ON `residentQuestionAttempts` (`questionId`);--> statement-breakpoint
CREATE INDEX `residentStudyProgress_user_idx` ON `residentStudyProgress` (`userId`);