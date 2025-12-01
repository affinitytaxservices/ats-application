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

CREATE TABLE IF NOT EXISTS whatsapp_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone_number VARCHAR(20) NOT NULL,
  message_id VARCHAR(100) UNIQUE,
  message TEXT,
  direction ENUM('inbound','outbound') DEFAULT 'inbound',
  message_type VARCHAR(50) DEFAULT 'text',
  raw_data JSON DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_phone_number (phone_number),
  INDEX idx_created_at (created_at),
  INDEX idx_direction (direction)
);

CREATE TABLE IF NOT EXISTS support_tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone_number VARCHAR(20) NOT NULL,
  message TEXT,
  response TEXT,
  status ENUM('open','in_progress','resolved','closed') DEFAULT 'open',
  assigned_to INT DEFAULT NULL,
  resolved_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
