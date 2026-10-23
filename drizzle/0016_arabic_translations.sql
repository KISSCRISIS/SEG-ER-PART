CREATE TABLE `questionArabicTranslations` (`questionId` varchar(180) NOT NULL,`sourceBank` varchar(64) NOT NULL,`text` text NOT NULL,`status` enum('pending-review','approved') NOT NULL DEFAULT 'pending-review',`createdByUserId` int,`createdAt` timestamp NOT NULL DEFAULT (now()),`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,CONSTRAINT `questionArabicTranslations_questionId` PRIMARY KEY(`questionId`));
--> statement-breakpoint
ALTER TABLE `questionArabicTranslations` ADD CONSTRAINT `questionArabicTranslations_createdByUserId_users_id_fk` FOREIGN KEY (`createdByUserId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX `questionArabicTranslations_bank_idx` ON `questionArabicTranslations` (`sourceBank`);
