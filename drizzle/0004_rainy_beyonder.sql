CREATE TABLE `medicalClinicalReviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`revisionId` int NOT NULL,
	`reviewerUserId` int,
	`reviewerName` varchar(255) NOT NULL,
	`reviewerCredential` varchar(255) NOT NULL,
	`decision` enum('changes_requested','approved','rejected') NOT NULL,
	`notes` text NOT NULL,
	`checklistVersion` varchar(64) NOT NULL,
	`reviewedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `medicalClinicalReviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `medicalContentItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(180) NOT NULL,
	`contentType` enum('article','clinical_pathway','drug_monograph','case','quiz','visual_atlas') NOT NULL,
	`lifecycleStatus` enum('draft','in_review','approved','retired') NOT NULL DEFAULT 'draft',
	`currentVersion` int NOT NULL DEFAULT 0,
	`createdByUserId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `medicalContentItems_id` PRIMARY KEY(`id`),
	CONSTRAINT `medicalContentItems_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `medicalContentRevisions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contentItemId` int NOT NULL,
	`version` int NOT NULL,
	`locale` enum('en','ar') NOT NULL DEFAULT 'en',
	`title` varchar(300) NOT NULL,
	`summary` text,
	`body` json NOT NULL,
	`changeSummary` text NOT NULL,
	`evidenceReviewedThrough` date,
	`reviewStatus` enum('draft','in_review','changes_requested','approved','rejected') NOT NULL DEFAULT 'draft',
	`createdByUserId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `medicalContentRevisions_id` PRIMARY KEY(`id`),
	CONSTRAINT `medicalContentRevisions_item_version_unique` UNIQUE(`contentItemId`,`version`)
);
--> statement-breakpoint
CREATE TABLE `medicalRevisionSources` (
	`revisionId` int NOT NULL,
	`sourceId` int NOT NULL,
	`locator` varchar(500),
	`claimScope` text NOT NULL,
	`addedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `medicalRevisionSources_revisionId_sourceId_pk` PRIMARY KEY(`revisionId`,`sourceId`)
);
--> statement-breakpoint
CREATE TABLE `medicalSources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sourceType` enum('guideline','systematic_review','journal','textbook','regulator','local_protocol','other') NOT NULL,
	`title` varchar(500) NOT NULL,
	`publisher` varchar(255),
	`canonicalUrl` varchar(2048),
	`externalIdentifier` varchar(255),
	`publishedAt` date,
	`accessedAt` timestamp NOT NULL,
	`contentChecksum` varchar(128),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `medicalSources_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `medicalClinicalReviews` ADD CONSTRAINT `medicalClinicalReviews_revisionId_medicalContentRevisions_id_fk` FOREIGN KEY (`revisionId`) REFERENCES `medicalContentRevisions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `medicalClinicalReviews` ADD CONSTRAINT `medicalClinicalReviews_reviewerUserId_users_id_fk` FOREIGN KEY (`reviewerUserId`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `medicalContentItems` ADD CONSTRAINT `medicalContentItems_createdByUserId_users_id_fk` FOREIGN KEY (`createdByUserId`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `medicalContentRevisions` ADD CONSTRAINT `medicalContentRevisions_contentItemId_medicalContentItems_id_fk` FOREIGN KEY (`contentItemId`) REFERENCES `medicalContentItems`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `medicalContentRevisions` ADD CONSTRAINT `medicalContentRevisions_createdByUserId_users_id_fk` FOREIGN KEY (`createdByUserId`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `medicalRevisionSources` ADD CONSTRAINT `medicalRevisionSources_revisionId_medicalContentRevisions_id_fk` FOREIGN KEY (`revisionId`) REFERENCES `medicalContentRevisions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `medicalRevisionSources` ADD CONSTRAINT `medicalRevisionSources_sourceId_medicalSources_id_fk` FOREIGN KEY (`sourceId`) REFERENCES `medicalSources`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `medicalClinicalReviews_revision_idx` ON `medicalClinicalReviews` (`revisionId`,`reviewedAt`);--> statement-breakpoint
CREATE INDEX `medicalContentItems_status_idx` ON `medicalContentItems` (`lifecycleStatus`);--> statement-breakpoint
CREATE INDEX `medicalContentRevisions_reviewStatus_idx` ON `medicalContentRevisions` (`reviewStatus`);--> statement-breakpoint
CREATE INDEX `medicalSources_externalIdentifier_idx` ON `medicalSources` (`externalIdentifier`);