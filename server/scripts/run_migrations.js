const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

(async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ats_DB',
    multipleStatements: true
  });

  const dir = path.join(__dirname, '..', 'migrations');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.sql')).sort();
  for (const file of files) {
    const sql = fs.readFileSync(path.join(dir, file), 'utf8');
    await connection.execute(sql);
    process.stdout.write(`Applied ${file}\n`);
  }

  await connection.end();
  process.stdout.write('Migrations completed\n');
})().catch(err => {
  console.error('Migration error:', err && err.message ? err.message : err);
  if (err && err.stack) console.error(err.stack);
  process.exit(1);
});
