-- Create database
CREATE DATABASE IF NOT EXISTS `web-laundry`;
USE `web-laundry`;

-- Admin users table for authentication
CREATE TABLE IF NOT EXISTS `admin-users` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(50) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Check table
SELECT * FROM `admin-users`;
