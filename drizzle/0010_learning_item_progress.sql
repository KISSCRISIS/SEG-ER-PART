CREATE TABLE `learningItemProgress` (
	`userId` int NOT NULL,
	`track` varchar(96) NOT NULL,
	`contentType` varchar(64) NOT NULL,
	`contentId` varchar(160) NOT NULL,
	`completed` int NOT NULL DEFAULT 0,
	`completedAt` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `learningItemProgress_userId_track_contentType_contentId_pk` PRIMARY KEY(`userId`,`track`,`contentType`,`contentId`),
	CONSTRAINT `learningItemProgress_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action
);
--> statement-breakpoint
CREATE INDEX `learningItemProgress_user_track_idx` ON `learningItemProgress` (`userId`,`track`);
