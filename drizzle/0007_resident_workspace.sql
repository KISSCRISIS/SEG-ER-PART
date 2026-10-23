CREATE TABLE `qbankExams` (`id` varchar(64) NOT NULL,`userId` int NOT NULL,`name` varchar(120) NOT NULL,`mode` enum('tutor','test') NOT NULL,`timeMode` enum('timed','untimed') NOT NULL,`status` enum('active','paused','completed') NOT NULL DEFAULT 'active',`configuration` json NOT NULL,`questionIds` json NOT NULL,`answers` json NOT NULL,`results` json NOT NULL,`flaggedQuestionIds` json NOT NULL,`currentIndex` int NOT NULL DEFAULT 0,`remainingSeconds` int,`correctCount` int,`startedAt` timestamp NOT NULL DEFAULT (now()),`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,`completedAt` timestamp,CONSTRAINT `qbankExams_id` PRIMARY KEY(`id`));
--> statement-breakpoint
CREATE TABLE `qbankQuestionStates` (`userId` int NOT NULL,`questionId` varchar(160) NOT NULL,`flagged` int NOT NULL DEFAULT 0,`skipped` int NOT NULL DEFAULT 0,`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,CONSTRAINT `qbankQuestionStates_userId_questionId_pk` PRIMARY KEY(`userId`,`questionId`));
--> statement-breakpoint
CREATE TABLE `medicalJournalNotes` (`id` varchar(64) NOT NULL,`userId` int NOT NULL,`title` varchar(180) NOT NULL,`body` text NOT NULL,`tags` json NOT NULL,`folder` varchar(100) NOT NULL DEFAULT 'General',`linkedType` enum('none','question','chapter','asset') NOT NULL DEFAULT 'none',`linkedId` varchar(180),`bookmarked` int NOT NULL DEFAULT 0,`createdAt` timestamp NOT NULL DEFAULT (now()),`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,`lastReviewedAt` timestamp,CONSTRAINT `medicalJournalNotes_id` PRIMARY KEY(`id`));
--> statement-breakpoint
ALTER TABLE `qbankExams` ADD CONSTRAINT `qbankExams_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE `qbankQuestionStates` ADD CONSTRAINT `qbankQuestionStates_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE `medicalJournalNotes` ADD CONSTRAINT `medicalJournalNotes_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX `qbankExams_user_status_idx` ON `qbankExams` (`userId`,`status`);
--> statement-breakpoint
CREATE INDEX `qbankExams_updated_idx` ON `qbankExams` (`updatedAt`);
--> statement-breakpoint
CREATE INDEX `qbankQuestionStates_user_idx` ON `qbankQuestionStates` (`userId`);
--> statement-breakpoint
CREATE INDEX `medicalJournalNotes_user_updated_idx` ON `medicalJournalNotes` (`userId`,`updatedAt`);
