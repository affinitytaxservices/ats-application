-- WhatsApp conversations table
CREATE TABLE whatsapp_conversations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone_number VARCHAR(20) NOT NULL,
  state VARCHAR(50) NOT NULL,
  data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_phone_number (phone_number),
  INDEX idx_updated_at (updated_at)
);

-- WhatsApp messages table for chat history
CREATE TABLE whatsapp_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone_number VARCHAR(20) NOT NULL,
  message_id VARCHAR(100),
  message_type ENUM('incoming', 'outgoing') NOT NULL,
  message_content JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_phone_number (phone_number),
  INDEX idx_created_at (created_at)
);

-- Appointments table
CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone_number VARCHAR(20) NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status ENUM('scheduled', 'completed', 'cancelled', 'no_show') DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_phone_number (phone_number),
  INDEX idx_appointment_date (appointment_date),
  INDEX idx_status (status)
);

-- Support tickets table
CREATE TABLE support_tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone_number VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('open', 'in_progress', 'resolved', 'closed') DEFAULT 'open',
  assigned_to INT,
  response TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP NULL,
  INDEX idx_phone_number (phone_number),
  INDEX idx_status (status),
  INDEX idx_assigned_to (assigned_to),
  FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
);

-- Tax returns table for refund status
CREATE TABLE tax_returns (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone_number VARCHAR(20) NOT NULL,
  tax_year YEAR NOT NULL,
  filing_status VARCHAR(50),
  refund_status VARCHAR(100),
  expected_refund DECIMAL(10,2),
  actual_refund DECIMAL(10,2),
  filed_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_phone_number (phone_number),
  INDEX idx_tax_year (tax_year),
  INDEX idx_filed_date (filed_date)
);

-- WhatsApp document uploads
CREATE TABLE whatsapp_documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone_number VARCHAR(20) NOT NULL,
  file_id VARCHAR(200) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100),
  file_size INT,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  processed BOOLEAN DEFAULT FALSE,
  notes TEXT,
  INDEX idx_phone_number (phone_number),
  INDEX idx_uploaded_at (uploaded_at),
  INDEX idx_processed (processed)
);