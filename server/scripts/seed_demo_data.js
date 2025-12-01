const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

(async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ats_DB',
    multipleStatements: true
  });

  const adminEmail = process.env.DEV_LOGIN_EMAIL || 'admin@demo.test';
  const adminPass = process.env.DEV_LOGIN_PASSWORD || 'Admin123!';
  const hash = await bcrypt.hash(adminPass, 10);

  await connection.execute(
    'INSERT IGNORE INTO users (email, password, firstName, lastName, role, phone) VALUES (?, ?, ?, ?, ?, ?)',
    [adminEmail, hash, 'Demo', 'Admin', 'admin', null]
  );

  await connection.execute(
    'INSERT IGNORE INTO clients (name, email) VALUES (?, ?)',
    ['Demo Client', 'client@demo.test']
  );

  await connection.execute(
    'INSERT IGNORE INTO appointments (client_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?)',
    [1, new Date().toISOString().slice(0,10), '14:30', 'scheduled']
  );

  await connection.execute(
    'INSERT IGNORE INTO tax_returns (client_id, tax_year, status, expected_refund) VALUES (?, ?, ?, ?)',
    [1, new Date().getFullYear(), 'filed', 0]
  );

  await connection.execute(
    'INSERT IGNORE INTO payments (client_id, amount, paymentStatus) VALUES (?, ?, ?)',
    [1, 150.00, 'completed']
  );

  const periods = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return d.toISOString().slice(0,10);
  });
  for (const p of periods) {
    await connection.execute(
      'INSERT IGNORE INTO revenue_analytics (period, revenue, expenses, profit) VALUES (?, ?, ?, ?)',
      [p, 0, 0, 0]
    );
  }

  await connection.execute(
    'INSERT IGNORE INTO system_health (service, status, message) VALUES (?, ?, ?)',
    ['api', 'ok', 'Healthy']
  );

  await connection.execute(
    'INSERT IGNORE INTO tasks (title, description, status, priority, assigneeId) VALUES (?, ?, ?, ?, ?)',
    ['Review documents', 'Initial review', 'open', 'high', 1]
  );

  await connection.end();
  process.stdout.write('Seed data inserted\n');
})().catch(err => {
  console.error('Seed error:', err.message);
  process.exit(1);
});
