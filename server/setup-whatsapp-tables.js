const pool = require('./db');

async function setupWhatsAppTables() {
  try {
    console.log('Setting up WhatsApp tables...');

    // Create whatsapp_conversations table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS whatsapp_conversations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        phone_number VARCHAR(20) NOT NULL,
        state VARCHAR(50) DEFAULT 'MENU',
        data JSON DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_phone_number (phone_number),
        INDEX idx_updated_at (updated_at)
      )
    `);

    // Create whatsapp_messages table
    await pool.query(`
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
      )
    `);

    // Create support_tickets table (if not exists)
    await pool.query(`
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
      )
    `);

    // Create appointments table (if not exists with WhatsApp fields)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        phone_number VARCHAR(20) DEFAULT NULL,
        user_id INT DEFAULT NULL,
        appointment_date DATE NOT NULL,
        appointment_time TIME NOT NULL,
        status ENUM('scheduled', 'completed', 'cancelled', 'no_show') DEFAULT 'scheduled',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_phone_number (phone_number),
        INDEX idx_user_id (user_id),
        INDEX idx_appointment_date (appointment_date),
        INDEX idx_status (status),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `);

    console.log('✅ WhatsApp tables created successfully!');
    
  } catch (error) {
    console.error('❌ Error setting up WhatsApp tables:', error);
    throw error;
  }
}

// Run the setup if this file is executed directly
if (require.main === module) {
  setupWhatsAppTables()
    .then(() => {
      console.log('WhatsApp tables setup completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Failed to setup WhatsApp tables:', error);
      process.exit(1);
    });
}

module.exports = { setupWhatsAppTables };