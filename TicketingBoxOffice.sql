-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.5.52-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for TicketingBoxOffice
CREATE DATABASE IF NOT EXISTS `ticketingboxoffice` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `TicketingBoxOffice`;

-- Dumping structure for table TicketingBoxOffice.category
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_id` (`category_id`),
  UNIQUE KEY `category_name` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED;

-- Dumping data for table TicketingBoxOffice.category: ~2 rows (approximately)
INSERT INTO `category` (`category_id`, `category_name`) VALUES
	(9, 'concert'),
	(11, 'sport');

-- Dumping structure for table TicketingBoxOffice.event
CREATE TABLE IF NOT EXISTS `event` (
  `event_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `event_name` varchar(100) NOT NULL,
  `event_date` date NOT NULL,
  `event_time` time NOT NULL,
  `event_location` varchar(255) NOT NULL,
  `event_capacity` int(11) NOT NULL,
  `event_status` enum('Active','Cancelled') NOT NULL,
  `event_description` text,
  `event_image` text,
  `category_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`event_id`),
  UNIQUE KEY `event_id` (`event_id`),
  KEY `FK_events_categories` (`category_id`),
  CONSTRAINT `FK_events_categories` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table TicketingBoxOffice.event: ~1 rows (approximately)
INSERT INTO `event` (`event_id`, `event_name`, `event_date`, `event_time`, `event_location`, `event_capacity`, `event_status`, `event_description`, `event_image`, `category_id`) VALUES
	(5, 'La casa', '2024-10-23', '21:30:00', 'Zgharta', 1500, 'Active', NULL, NULL, 9);

-- Dumping structure for table TicketingBoxOffice.price
CREATE TABLE IF NOT EXISTS `price` (
  `price_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `ticket_price` decimal(10,2) NOT NULL,
  `event_id` bigint(20) unsigned NOT NULL,
  `section_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`price_id`),
  UNIQUE KEY `price_id` (`price_id`),
  KEY `FK_pricing_events` (`event_id`),
  KEY `FK_pricing_sections` (`section_id`),
  CONSTRAINT `FK_pricing_events` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_pricing_sections` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table TicketingBoxOffice.price: ~1 rows (approximately)
INSERT INTO `price` (`price_id`, `ticket_price`, `event_id`, `section_id`) VALUES
	(1, 99.50, 5, 1);

-- Dumping structure for table TicketingBoxOffice.section
CREATE TABLE IF NOT EXISTS `section` (
  `section_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `section_name` varchar(100) NOT NULL,
  `row_count` int(11) NOT NULL,
  `seat_count` int(11) NOT NULL,
  `section_status` enum('Available','Unavailable') NOT NULL,
  `event_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`section_id`),
  UNIQUE KEY `section_id` (`section_id`),
  KEY `FK_sections_events` (`event_id`),
  CONSTRAINT `FK_sections_events` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table TicketingBoxOffice.section: ~1 rows (approximately)
INSERT INTO `section` (`section_id`, `section_name`, `row_count`, `seat_count`, `section_status`, `event_id`) VALUES
	(1, 'VIP', 10, 100, 'Available', 5);

-- Dumping structure for table TicketingBoxOffice.ticket
CREATE TABLE IF NOT EXISTS `ticket` (
  `ticket_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `ticket_status` enum('Purchased','Refunded') NOT NULL,
  `seat_number` varchar(10) NOT NULL,
  `purchase_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expiry_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `qr_code` text NOT NULL,
  `section_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `event_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`ticket_id`),
  UNIQUE KEY `ticket_id` (`ticket_id`),
  UNIQUE KEY `qr_code` (`qr_code`(255)) USING BTREE,
  KEY `FK_tickets_sections` (`section_id`),
  KEY `FK_tickets_users` (`user_id`),
  KEY `FK_tickets_events` (`event_id`),
  CONSTRAINT `FK_tickets_events` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tickets_sections` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tickets_users` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table TicketingBoxOffice.ticket: ~1 rows (approximately)
INSERT INTO `ticket` (`ticket_id`, `ticket_status`, `seat_number`, `purchase_date`, `expiry_date`, `qr_code`, `section_id`, `user_id`, `event_id`) VALUES
	(1, 'Purchased', '27', '2024-07-12 21:00:00', '2024-10-23 21:00:00', 'Not Available now', 1, 4, 5);

-- Dumping structure for table TicketingBoxOffice.transaction
CREATE TABLE IF NOT EXISTS `transaction` (
  `transaction_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `transaction_status` enum('Paid','Refunded') NOT NULL,
  `transaction_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amount` decimal(10,2) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `refund_reason` text,
  `ticket_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`transaction_id`),
  UNIQUE KEY `transaction_id` (`transaction_id`),
  KEY `FK_transactions_tickets` (`ticket_id`),
  KEY `FK_transactions_users` (`user_id`),
  CONSTRAINT `FK_transactions_tickets` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`ticket_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_transactions_users` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table TicketingBoxOffice.transaction: ~1 rows (approximately)
INSERT INTO `transaction` (`transaction_id`, `transaction_status`, `transaction_date`, `amount`, `currency`, `payment_method`, `refund_reason`, `ticket_id`, `user_id`) VALUES
	(2, 'Paid', '2024-07-12 21:00:00', 100.00, 'USD', 'WHISH', NULL, 1, 4);

-- Dumping structure for table TicketingBoxOffice.user
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `role` enum('Admin','Customer') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone_number` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Dumping data for table TicketingBoxOffice.user: ~4 rows (approximately)
INSERT INTO `user` (`user_id`, `role`, `created_at`, `first_name`, `last_name`, `email`, `password`, `phone_number`) VALUES
	(4, 'Admin', '2021-06-26 21:00:00', 'george', 'frangieh', 'georgefrangieh12@gmail.com', '$2b$10$jmsxWP2EcAYSKNqtiWT.eu9SRJPb07e0.Pqo.kENEB7fKAFesrLXW', '71-928-557'),
	(5, 'Admin', '2023-12-26 22:00:00', 'george', 'frangieh', 'georgefrangieh', '$2b$10$iCK73aErhpoIJad0/1jY3eK5LIII1kkz9PIPZdbLA9V6QEJxyhEI6', '11222-1222'),
	(6, 'Admin', '2024-07-11 21:00:00', 'Andrew', 'Frangieh', 'andrewFran9@gmail.com', '$2b$10$axYw4lCryn/tRRhdHLSqlO3gfVAolJlv5hT7iBQLwstSZtehtx9lO', ''),
	(7, 'Customer', '2020-02-21 22:00:00', 'William', 'Frangieh', 'williamfrangieh16@gmail.com', '$2b$10$HXs9rJ3WF6aOzf7/yi6Qq.fWBxVFS9Dkh94FHtRWoPClFeEIJgjJq', NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
