-- Affinity Tax Services Database Schema

-- Users Table
USE affinitytaxservi_demo;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  role ENUM('client', 'admin', 'tax_professional') NOT NULL DEFAULT 'client',
  phone VARCHAR(20),
  address VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(50),
  zipCode VARCHAR(20),
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  INDEX idx_email (email),
  INDEX idx_role (role)
);

-- Tax Documents Table
CREATE TABLE IF NOT EXISTS tax_documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  documentType VARCHAR(50) NOT NULL,
  fileName VARCHAR(255) NOT NULL,
  filePath VARCHAR(255) NOT NULL,
  fileSize INT NOT NULL,
  mimeType VARCHAR(100) NOT NULL,
  taxYear VARCHAR(4) NOT NULL,
  status ENUM('uploaded', 'processed', 'rejected') NOT NULL DEFAULT 'uploaded',
  notes TEXT,
  uploadedAt DATETIME NOT NULL,
  processedAt DATETIME,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (userId),
  INDEX idx_tax_year (taxYear),
  INDEX idx_status (status)
);

-- Tax Returns Table
CREATE TABLE IF NOT EXISTS tax_returns (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  taxYear VARCHAR(4) NOT NULL,
  status ENUM('draft', 'submitted', 'processing', 'completed', 'rejected') NOT NULL DEFAULT 'draft',
  totalIncome DECIMAL(12, 2),
  totalDeductions DECIMAL(12, 2),
  taxableIncome DECIMAL(12, 2),
  taxDue DECIMAL(12, 2),
  refundAmount DECIMAL(12, 2),
  filingDate DATETIME,
  completionDate DATETIME,
  notes TEXT,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (userId),
  INDEX idx_tax_year (taxYear),
  INDEX idx_status (status),
  UNIQUE KEY unique_user_year (userId, taxYear)
);

-- Tax Payments Table
CREATE TABLE IF NOT EXISTS tax_payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  taxReturnId INT,
  amount DECIMAL(12, 2) NOT NULL,
  paymentDate DATETIME NOT NULL,
  paymentMethod VARCHAR(50) NOT NULL,
  transactionId VARCHAR(100),
  status ENUM('pending', 'completed', 'failed') NOT NULL DEFAULT 'pending',
  notes TEXT,
  createdAt DATETIME NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (taxReturnId) REFERENCES tax_returns(id) ON DELETE SET NULL,
  INDEX idx_user_id (userId),
  INDEX idx_tax_return_id (taxReturnId)
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  priority ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
  isRead BOOLEAN NOT NULL DEFAULT FALSE,
  createdAt DATETIME NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (userId),
  INDEX idx_is_read (isRead)
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  professionalId INT,
  appointmentDate DATETIME NOT NULL,
  duration INT NOT NULL, -- in minutes
  status ENUM('scheduled', 'completed', 'cancelled', 'no-show') NOT NULL DEFAULT 'scheduled',
  notes TEXT,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (professionalId) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_user_id (userId),
  INDEX idx_professional_id (professionalId),
  INDEX idx_appointment_date (appointmentDate)
);