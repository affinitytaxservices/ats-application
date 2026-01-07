const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'affinity2_live',
  password: process.env.DB_PASSWORD || 'Renegade4-Cobbler7-Turbine1-Sizable6-Buddy2',
  database: process.env.DB_NAME || 'affinity2_dev',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;