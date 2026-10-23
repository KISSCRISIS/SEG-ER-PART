ALTER TABLE `residentQuestionAttempts` MODIFY COLUMN `family` enum('EDIC','FRCEM','HIPPO','OXFORD_SCE','PEER_PHYSICS','PEER_PHYSICIANS','ROSEN_10E','TINTINALLI_9E') NOT NULL;
--> statement-breakpoint
UPDATE `residentQuestionAttempts` SET `family` = 'PEER_PHYSICIANS' WHERE `family` = 'PEER_PHYSICS';
--> statement-breakpoint
ALTER TABLE `residentQuestionAttempts` MODIFY COLUMN `family` enum('EDIC','FRCEM','HIPPO','OXFORD_SCE','PEER_PHYSICIANS','ROSEN_10E','TINTINALLI_9E') NOT NULL;
