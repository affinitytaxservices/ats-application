const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Dev shortcut login without DB
    if (process.env.NODE_ENV !== 'production') {
      const devUsers = [
        { email: process.env.DEV_LOGIN_EMAIL || 'dev@local.test', password: process.env.DEV_LOGIN_PASSWORD || 'admin123', role: 'admin', firstName: 'Dev', lastName: 'Admin' },
        { email: 'admin@demo.test', password: 'Admin123!', role: 'admin', firstName: 'Demo', lastName: 'Admin' },
        { email: 'client@demo.test', password: 'Client123!', role: 'client', firstName: 'Demo', lastName: 'Client' },
        { email: 'preparer@demo.test', password: 'Preparer123!', role: 'tax_professional', firstName: 'Demo', lastName: 'Preparer' },
        { email: 'manager@demo.test', password: 'Manager123!', role: 'manager', firstName: 'Demo', lastName: 'Manager' },
        { email: 'employee@demo.test', password: 'Employee123!', role: 'employee', firstName: 'Demo', lastName: 'Employee' }
      ];
      const matched = devUsers.find(u => u.email === email && u.password === password);
      if (matched) {
        const user = { id: 1, email: matched.email, firstName: matched.firstName, lastName: matched.lastName, role: matched.role, phone: null };
        const payload = { id: user.id, email: user.email, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '12h' });
        return res.json({ success: true, token, user });
      }
    }

    const [rows] = await pool.query(
      'SELECT id, email, password, firstName, lastName, role, phone FROM users WHERE email = ? LIMIT 1',
      [email]
    );

    const user = rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid email or password' });

    // Sign JWT
    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '12h' });

    const { password: _, ...safeUser } = user;
    return res.json({ success: true, token, user: safeUser });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Login failed' });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body;
  if (!email?.trim() || !password?.trim() || !firstName?.trim() || !lastName?.trim()) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const [exists] = await pool.query('SELECT id FROM users WHERE email = ? LIMIT 1', [email]);
    if (exists.length) return res.status(409).json({ error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const now = new Date();

    const [result] = await pool.query(
      `INSERT INTO users (email, password, firstName, lastName, role, phone, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, 'client', ?, ?, ?)`,
      [email, hashed, firstName, lastName, phone || null, now, now]
    );

    const user = { id: result.insertId, email, firstName, lastName, role: 'client', phone: phone || null };
    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '12h' });

    return res.status(201).json({ success: true, token, user });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Registration failed' });
  }
});

// GET /api/auth/me
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, email, firstName, lastName, role, phone FROM users WHERE id = ? LIMIT 1',
      [req.user.id]
    );

    const user = rows[0];
    if (!user) return res.status(404).json({ error: 'User not found' });

    return res.json({ success: true, user });
  } catch (err) {
    console.error('Get current user error:', err);
    return res.status(500).json({ error: 'Failed to fetch user' });
  }
});

module.exports = router;
