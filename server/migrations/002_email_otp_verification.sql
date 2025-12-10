-- Add user verification columns
ALTER TABLE users
  ADD COLUMN isVerified TINYINT(1) NOT NULL DEFAULT 0 AFTER phone,
  ADD COLUMN verifiedAt TIMESTAMP NULL DEFAULT NULL AFTER isVerified;

-- Table to store email OTPs for users
CREATE TABLE IF NOT EXISTS user_email_otps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  otpHash VARCHAR(255) NOT NULL,
  expiresAt TIMESTAMP NOT NULL,
  attempts INT NOT NULL DEFAULT 0,
  resendCount INT NOT NULL DEFAULT 0,
  lastSentAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status ENUM('pending','verified','expired') NOT NULL DEFAULT 'pending',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  verifiedAt TIMESTAMP NULL DEFAULT NULL,
  INDEX idx_user_status (userId, status),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Logs for OTP verification attempts
CREATE TABLE IF NOT EXISTS otp_verification_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  success TINYINT(1) NOT NULL,
  reason VARCHAR(255) NULL,
  ipAddress VARCHAR(64) NULL,
  userAgent VARCHAR(255) NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_created (userId, createdAt),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

