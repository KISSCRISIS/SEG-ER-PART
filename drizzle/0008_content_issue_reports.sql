CREATE TABLE `contentIssueReports` (`id` varchar(64) NOT NULL,`userId` int NOT NULL,`itemType` enum('question','chapter','asset') NOT NULL,`itemId` varchar(180) NOT NULL,`issueType` enum('incorrect_answer','outdated_guideline','unclear_explanation','duplicate','source_locator','other') NOT NULL,`details` text NOT NULL,`status` enum('open','reviewing','resolved','dismissed') NOT NULL DEFAULT 'open',`createdAt` timestamp NOT NULL DEFAULT (now()),`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,CONSTRAINT `contentIssueReports_id` PRIMARY KEY(`id`));
--> statement-breakpoint
ALTER TABLE `contentIssueReports` ADD CONSTRAINT `contentIssueReports_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX `contentIssueReports_item_idx` ON `contentIssueReports` (`itemType`,`itemId`);
--> statement-breakpoint
CREATE INDEX `contentIssueReports_user_status_idx` ON `contentIssueReports` (`userId`,`status`);
