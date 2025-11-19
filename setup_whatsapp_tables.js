// WhatsApp Tables Setup Script
// Run this script to create WhatsApp-related database tables

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function setupWhatsAppTables() {
  console.log('Setting up WhatsApp database tables...');
  
  try {
    // Read database configuration from environment
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'ats_user',
      password: process.env.DB_PASSWORD || 'C$y0&4Xy3ff7eg&tT3W%',
      database: process.env.DB_NAME || 'ats_DB',
      multipleStatements: true // Allow multiple SQL statements
    });

    // Read the migration SQL file
    const migrationPath = path.join(__dirname, 'server', 'migrations', 'whatsapp_tables.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('Creating WhatsApp tables...');
    
    // Execute the SQL statements
    await connection.execute(migrationSQL);
    
    console.log('✅ WhatsApp tables created successfully!');
    console.log('Created tables:');
    console.log('- whatsapp_conversations');
    console.log('- whatsapp_messages');
    console.log('- appointments');
    console.log('- support_tickets');
    console.log('- tax_returns');
    console.log('- whatsapp_documents');
    
    await connection.end();
  } catch (error) {
    console.error('❌ Error setting up WhatsApp tables:', error.message);
    if (error.code === 'ER_TABLE_EXISTS_ERROR') {
      console.log('Some tables already exist. This is normal if you\'ve run this before.');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('Could not connect to MySQL database.');
      console.log('Please ensure MySQL is running and your database credentials are correct.');
      console.log('You can run this script again once your database is ready.');
    } else {
      console.error('Full error:', error);
    }
    process.exit(1);
  }
}

// Run the setup
if (require.main === module) {
  setupWhatsAppTables();
}

module.exports = { setupWhatsAppTables };