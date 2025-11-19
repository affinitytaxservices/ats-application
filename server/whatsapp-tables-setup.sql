-- WhatsApp Business API Database Tables Setup
-- Run these SQL commands in your MySQL database to set up the WhatsApp tables

-- Create whatsapp_conversations table
CREATE TABLE IF NOT EXISTS whatsapp_conversations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone_number VARCHAR(20) NOT NULL,
  state VARCHAR(50) DEFAULT 'MENU',
  data JSON DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_phone_number (phone_number),
  INDEX idx_updated_at (updated_at)
);

-- Create whatsapp_messages table
CREATE TABLE IF NOT EXISTS whatsapp_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone_number VARCHAR(20) NOT NULL,
  message_id VARCHAR(100) UNIQUE,
  message TEXT,
  direction ENUM('inbound', 'outbound') DEFAULT 'inbound',
  message_type VARCHAR(50) DEFAULT 'text',
  raw_data JSON DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_phone_number (phone_number),
  INDEX idx_created_at (created_at),
  INDEX idx_direction (direction)
);

-- Create support_tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone_number VARCHAR(20) NOT NULL,
  message TEXT,
  response TEXT,
  status ENUM('open', 'in_progress', 'resolved', 'closed') DEFAULT 'open',
  assigned_to INT DEFAULT NULL,
  resolved_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_phone_number (phone_number),
  INDEX idx_status (status),
  INDEX idx_assigned_to (assigned_to),
  INDEX idx_created_at (created_at),
  FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
);

-- Update appointments table to add phone_number for WhatsApp bookings
ALTER TABLE appointments 
ADD COLUMN IF NOT EXISTS phone_number VARCHAR(20) DEFAULT NULL,
ADD INDEX IF NOT EXISTS idx_phone_number (phone_number);

-- Grant permissions (replace 'ats_user' with your actual database user)
GRANT ALL PRIVILEGES ON whatsapp_conversations TO 'ats_user'@'%';
GRANT ALL PRIVILEGES ON whatsapp_messages TO 'ats_user'@'%';
GRANT ALL PRIVILEGES ON support_tickets TO 'ats_user'@'%';

-- Sample data for testing (optional)
INSERT INTO whatsapp_conversations (phone_number, state, data) VALUES 
('+1234567890', 'MENU', '{"last_interaction": "2024-01-15"}'),
('+1987654321', 'TAX_QUESTION', '{"tax_question": "What documents do I need?"}');

INSERT INTO whatsapp_messages (phone_number, message, direction, message_type) VALUES 
('+1234567890', 'Hello, I need help with my taxes', 'inbound', 'text'),
('+1234567890', 'Hi! Welcome to Tax Services Bot. How can I help you today?', 'outbound', 'text');

INSERT INTO support_tickets (phone_number, message, status) VALUES 
('+1234567890', 'I need help understanding tax deductions', 'open'),
('+1987654321', 'Appointment booking issue', 'in_progress');

INSERT INTO appointments (phone_number, user_id, appointment_date, appointment_time, status, notes) VALUES 
('+1234567890', NULL, '2024-01-20', '14:30:00', 'scheduled', 'WhatsApp booking - Tax consultation');

-- Verify tables were created
SHOW TABLES LIKE 'whatsapp_%';
SHOW TABLES LIKE 'support_tickets';

-- Check table structure
DESCRIBE whatsapp_conversations;
DESCRIBE whatsapp_messages;
DESCRIBE support_tickets;