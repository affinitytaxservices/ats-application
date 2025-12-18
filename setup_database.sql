-- Create users table
USE affinity2_dev;

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
  '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- hashed password for 'password123'
  'Nick',
  'Fury',
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
  '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- hashed password for 'password123'
  'Steve',
  'Rogers',
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
  '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- hashed password for 'password123'
  'Peter',
  'Parker',
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

-- Create tasks table for task management
CREATE TABLE IF NOT EXISTS `tasks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `assigneeId` INT,
  `assigneeName` VARCHAR(255),
  `status` ENUM('pending', 'in_progress', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
  `priority` ENUM('low', 'medium', 'high', 'urgent') NOT NULL DEFAULT 'medium',
  `dueDate` DATETIME,
  `completedAt` DATETIME,
  `clientId` INT,
  `taxReturnId` INT,
  `notes` TEXT,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  FOREIGN KEY (`assigneeId`) REFERENCES `users`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`taxReturnId`) REFERENCES `tax_returns`(`id`) ON DELETE CASCADE
);

-- Create payments table for payment processing
CREATE TABLE IF NOT EXISTS `payments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `clientId` INT NOT NULL,
  `taxReturnId` INT,
  `amount` DECIMAL(12,2) NOT NULL,
  `paymentMethod` ENUM('credit_card', 'debit_card', 'bank_transfer', 'check', 'cash') NOT NULL,
  `paymentStatus` ENUM('pending', 'processing', 'completed', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
  `transactionId` VARCHAR(255),
  `paymentDate` DATETIME,
  `description` TEXT,
  `fees` DECIMAL(12,2) DEFAULT 0.00,
  `refundAmount` DECIMAL(12,2) DEFAULT 0.00,
  `refundReason` TEXT,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`taxReturnId`) REFERENCES `tax_returns`(`id`) ON DELETE SET NULL
);

-- Create contact_forms table for contact form submissions
CREATE TABLE IF NOT EXISTS `contact_forms` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20),
  `subject` VARCHAR(255),
  `message` TEXT NOT NULL,
  `status` ENUM('new', 'in_progress', 'resolved', 'closed') NOT NULL DEFAULT 'new',
  `priority` ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
  `assignedTo` INT,
  `response` TEXT,
  `respondedAt` DATETIME,
  `ipAddress` VARCHAR(45),
  `userAgent` VARCHAR(255),
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  FOREIGN KEY (`assignedTo`) REFERENCES `users`(`id`) ON DELETE SET NULL
);

-- Create tax_documents table (separate from general documents for tax-specific docs)
CREATE TABLE IF NOT EXISTS `tax_documents` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` INT NOT NULL,
  `taxReturnId` INT,
  `documentType` ENUM('W-2', '1099-INT', '1099-DIV', '1099-MISC', '1098-E', '1098-T', 'Property Tax Receipt', 'Charitable Donation Receipt', 'Medical Expense Receipt', 'Other') NOT NULL,
  `fileName` VARCHAR(255) NOT NULL,
  `filePath` VARCHAR(255) NOT NULL,
  `fileSize` INT NOT NULL,
  `mimeType` VARCHAR(100) NOT NULL,
  `taxYear` VARCHAR(4) NOT NULL,
  `status` ENUM('uploaded', 'processing', 'processed', 'rejected') NOT NULL DEFAULT 'uploaded',
  `notes` TEXT,
  `uploadedAt` DATETIME NOT NULL,
  `processedAt` DATETIME,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`taxReturnId`) REFERENCES `tax_returns`(`id`) ON DELETE SET NULL
);

-- Create employee_types table for employee role management
CREATE TABLE IF NOT EXISTS `employee_types` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` INT NOT NULL,
  `employeeType` ENUM('preparer', 'admin', 'manager') NOT NULL,
  `employeeId` VARCHAR(50),
  `department` VARCHAR(100),
  `hireDate` DATE,
  `salary` DECIMAL(12,2),
  `permissions` JSON,
  `isActive` BOOLEAN DEFAULT TRUE,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Create system_health table for monitoring system status
CREATE TABLE IF NOT EXISTS `system_health` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `serviceName` VARCHAR(100) NOT NULL,
  `status` ENUM('healthy', 'warning', 'critical', 'down') NOT NULL,
  `responseTime` INT, -- in milliseconds
  `errorMessage` TEXT,
  `lastChecked` DATETIME NOT NULL,
  `uptime` DECIMAL(5,2), -- percentage
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL
);

-- Create revenue_analytics table for financial tracking
CREATE TABLE IF NOT EXISTS `revenue_analytics` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `period` DATE NOT NULL, -- month/year for the revenue period
  `revenue` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `expenses` DECIMAL(12,2) DEFAULT 0.00,
  `profit` DECIMAL(12,2) DEFAULT 0.00,
  `clientCount` INT DEFAULT 0,
  `returnsProcessed` INT DEFAULT 0,
  `averageReturnValue` DECIMAL(12,2) DEFAULT 0.00,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  UNIQUE KEY `unique_period` (`period`)
);

-- Create user_activity table for tracking user engagement
CREATE TABLE IF NOT EXISTS `user_activity` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` INT,
  `activityType` ENUM('login', 'logout', 'document_upload', 'appointment_scheduled', 'payment_made', 'profile_updated') NOT NULL,
  `description` TEXT,
  `ipAddress` VARCHAR(45),
  `userAgent` VARCHAR(255),
  `sessionId` VARCHAR(255),
  `metadata` JSON,
  `createdAt` DATETIME NOT NULL,
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL
);

-- Create refund_status table for tracking tax refund status
CREATE TABLE IF NOT EXISTS `refund_status` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `taxReturnId` INT NOT NULL,
  `federalStatus` ENUM('not_filed', 'filed', 'accepted', 'rejected', 'refund_issued') DEFAULT 'not_filed',
  `stateStatus` ENUM('not_filed', 'filed', 'accepted', 'rejected', 'refund_issued') DEFAULT 'not_filed',
  `federalRefundAmount` DECIMAL(12,2) DEFAULT 0.00,
  `stateRefundAmount` DECIMAL(12,2) DEFAULT 0.00,
  `federalRefundDate` DATE,
  `stateRefundDate` DATE,
  `trackingNumber` VARCHAR(100),
  `notes` TEXT,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  FOREIGN KEY (`taxReturnId`) REFERENCES `tax_returns`(`id`) ON DELETE CASCADE
);

-- Create messages table for internal messaging system
CREATE TABLE IF NOT EXISTS `messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `senderId` INT NOT NULL,
  `receiverId` INT NOT NULL,
  `subject` VARCHAR(255),
  `message` TEXT NOT NULL,
  `isRead` BOOLEAN DEFAULT FALSE,
  `readAt` DATETIME,
  `priority` ENUM('low', 'medium', 'high') DEFAULT 'medium',
  `messageType` ENUM('general', 'task_related', 'client_related', 'system') DEFAULT 'general',
  `relatedTaskId` INT,
  `relatedClientId` INT,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  FOREIGN KEY (`senderId`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`receiverId`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`relatedTaskId`) REFERENCES `tasks`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`relatedClientId`) REFERENCES `clients`(`id`) ON DELETE SET NULL
);

-- Create consultation_requests table for tax planning consultations
CREATE TABLE IF NOT EXISTS `consultation_requests` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20),
  `planningType` VARCHAR(100),
  `message` TEXT,
  `status` ENUM('new', 'scheduled', 'completed', 'cancelled') DEFAULT 'new',
  `assignedTo` INT,
  `scheduledDate` DATETIME,
  `notes` TEXT,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  FOREIGN KEY (`assignedTo`) REFERENCES `users`(`id`) ON DELETE SET NULL
);