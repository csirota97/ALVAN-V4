-- Users:

CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `token` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `token_UNIQUE` (`token`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Lists:

CREATE TABLE `Lists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Owner` int DEFAULT NULL,
  `Calendar` int DEFAULT NULL,
  `Name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Events:

CREATE TABLE `Events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ListID` int NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Completed` tinyint(1) DEFAULT '0',
  `inProgress` tinyint(1) NOT NULL DEFAULT '0',
  `repeatInterval` int NOT NULL DEFAULT '-1',
  `repeatUnit` int DEFAULT NULL,
  `repeatStartDate` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `listId_idx` (`ListID`),
  CONSTRAINT `listId` FOREIGN KEY (`ListID`) REFERENCES `Lists` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Reminders:

CREATE TABLE `Reminders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `reminderString` varchar(255) NOT NULL,
  `reminder_dt` int NOT NULL,
  `completed` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ToDo List Device Keys

CREATE TABLE `todo_list_device_keys` (
  `device_key` varchar(255) NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`device_key`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `user` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
