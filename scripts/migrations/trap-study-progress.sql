CREATE TABLE IF NOT EXISTS `trapStudyProgress` (
  `userId` int NOT NULL,
  `trapId` varchar(80) NOT NULL,
  `completed` int NOT NULL DEFAULT 0,
  `completedAt` timestamp NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`, `trapId`)
);
