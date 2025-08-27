-- Affinity Tax Services Database Setup Script

-- Create users table
USE affinitytaxservi_demo;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `firstName` VARCHAR(100) NOT NULL,
  `lastName` VARCHAR(100) NOT NULL,
  `role` ENUM('client', 'admin', 'tax_professional') NOT NULL DEFAULT 'client',
  `phone` VARCHAR(20),
  `address` VARCHAR(255),
  `city` VARCHAR(100),
  `state` VARCHAR(50),
  `zipCode` VARCHAR(20),
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL
);

-- Create clients table
CREATE TABLE IF NOT EXISTS `clients` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` INT NOT NULL,
  `ssn` VARCHAR(11),
  `dateOfBirth` DATE,
  `filingStatus` ENUM('single', 'married_joint', 'married_separate', 'head_of_household', 'qualifying_widow') NOT NULL,
  `dependents` INT DEFAULT 0,
  `notes` TEXT,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Create tax_returns table
CREATE TABLE IF NOT EXISTS `tax_returns` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `clientId` INT NOT NULL,
  `taxYear` INT NOT NULL,
  `status` ENUM('draft', 'review', 'filed', 'accepted', 'rejected', 'amended') NOT NULL DEFAULT 'draft',
  `filingDate` DATETIME,
  `totalIncome` DECIMAL(12,2),
  `totalDeductions` DECIMAL(12,2),
  `totalCredits` DECIMAL(12,2),
  `taxLiability` DECIMAL(12,2),
  `refundAmount` DECIMAL(12,2),
  `notes` TEXT,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE CASCADE
);

-- Create documents table
CREATE TABLE IF NOT EXISTS `documents` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` INT NOT NULL,
  `taxReturnId` INT,
  `name` VARCHAR(255) NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  `path` VARCHAR(255) NOT NULL,
  `size` INT NOT NULL,
  `uploadDate` DATETIME NOT NULL,
  `description` TEXT,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`taxReturnId`) REFERENCES `tax_returns`(`id`) ON DELETE SET NULL
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS `appointments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `clientId` INT NOT NULL,
  `taxProfessionalId` INT NOT NULL,
  `date` DATETIME NOT NULL,
  `duration` INT NOT NULL DEFAULT 60, -- in minutes
  `status` ENUM('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show') NOT NULL DEFAULT 'scheduled',
  `notes` TEXT,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`taxProfessionalId`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Insert a test admin user
INSERT INTO `users` (
  `email`, 
  `password`, 
  `firstName`, 
  `lastName`, 
  `role`, 
  `phone`, 
  `createdAt`, 
  `updatedAt`
) VALUES (
  'admin@affinitytax.com',
  '$2b$10$iGEMA76FzT7h6mRmVV.Nw.FvAn5JUNp7Q8YaJRzQuzT/1.GXSz4Aq', -- hashed password for 'password123'
  'Admin',
  'User',
  'admin',
  '555-123-4567',
  NOW(),
  NOW()
);

-- Insert a test tax professional
INSERT INTO `users` (
  `email`, 
  `password`, 
  `firstName`, 
  `lastName`, 
  `role`, 
  `phone`, 
  `createdAt`, 
  `updatedAt`
) VALUES (
  'taxpro@affinitytax.com',
  '$2b$10$iGEMA76FzT7h6mRmVV.Nw.FvAn5JUNp7Q8YaJRzQuzT/1.GXSz4Aq', -- hashed password for 'password123'
  'Tax',
  'Professional',
  'tax_professional',
  '555-987-6543',
  NOW(),
  NOW()
);

-- Insert a test client
INSERT INTO `users` (
  `email`, 
  `password`, 
  `firstName`, 
  `lastName`, 
  `role`, 
  `phone`, 
  `address`, 
  `city`, 
  `state`, 
  `zipCode`, 
  `createdAt`, 
  `updatedAt`
) VALUES (
  'client@example.com',
  '$2b$10$iGEMA76FzT7h6mRmVV.Nw.FvAn5JUNp7Q8YaJRzQuzT/1.GXSz4Aq', -- hashed password for 'password123'
  'John',
  'Doe',
  'client',
  '555-555-5555',
  '123 Main St',
  'Anytown',
  'CA',
  '90210',
  NOW(),
  NOW()
);

-- Get the ID of the client user we just inserted
SET @clientUserId = LAST_INSERT_ID();

-- Insert client record
INSERT INTO `clients` (
  `userId`,
  `ssn`,
  `dateOfBirth`,
  `filingStatus`,
  `dependents`,
  `notes`,
  `createdAt`,
  `updatedAt`
) VALUES (
  @clientUserId,
  '123-45-6789',
  '1980-01-01',
  'single',
  0,
  'Test client record',
  NOW(),
  NOW()
);

-- Create analytics table for admin dashboard
CREATE TABLE IF NOT EXISTS `analytics` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `date` DATE NOT NULL,
  `total_returns_filed` INT DEFAULT 0,
  `total_returns_accepted` INT DEFAULT 0,
  `total_returns_rejected` INT DEFAULT 0,
  `total_appointments` INT DEFAULT 0,
  `total_new_clients` INT DEFAULT 0,
  `total_revenue` DECIMAL(12,2) DEFAULT 0.00,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL
);

-- Create notifications table for admin alerts
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` INT NOT NULL,
  `type` ENUM('system', 'appointment', 'document', 'tax_return', 'message') NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `isRead` BOOLEAN DEFAULT FALSE,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Create audit_logs table for tracking admin actions
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` INT NOT NULL,
  `action` VARCHAR(100) NOT NULL,
  `tableName` VARCHAR(100) NOT NULL,
  `recordId` INT,
  `oldValues` JSON,
  `newValues` JSON,
  `ipAddress` VARCHAR(45),
  `userAgent` VARCHAR(255),
  `createdAt` DATETIME NOT NULL,
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Create settings table for admin configurations
CREATE TABLE IF NOT EXISTS `settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `key` VARCHAR(100) NOT NULL UNIQUE,
  `value` TEXT NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `description` TEXT,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL
);