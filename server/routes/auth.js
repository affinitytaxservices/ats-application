const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const { sendOtpEmail } = require('../utils/mailer');

const router = express.Router();

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function signToken(user) {
  const payload = { id: user.id, email: user.email, role: user.role, verified: !!user.isVerified };
  return jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '12h' });
}

const verifyOtpLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false });
const resendOtpLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 3, standardHeaders: true, legacyHeaders: false });

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
      'SELECT id, email, password, firstName, lastName, role, phone, isVerified FROM users WHERE email = ? LIMIT 1',
      [email]
    );

    const user = rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid email or password' });

    if (!user.isVerified) {
      const token = signToken(user);
      const { password: _pw, ...safeUser } = user;
      return res.status(200).json({ success: true, token, user: safeUser, requiresVerification: true });
    }

    const token = signToken(user);

    const { password: _, ...safeUser } = user;
    return res.json({ success: true, token, user: safeUser });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Login failed' });
  }
});

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
      `INSERT INTO users (email, password, firstName, lastName, role, phone, createdAt, updatedAt, isVerified)
       VALUES (?, ?, ?, ?, 'client', ?, ?, ?, 0)`,
      [email, hashed, firstName, lastName, phone || null, now, now]
    );

    const user = { id: result.insertId, email, firstName, lastName, role: 'client', phone: phone || null, isVerified: 0 };

    const code = generateOtp();
    const otpHash = await bcrypt.hash(code, 10);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await pool.query(
      `INSERT INTO user_email_otps (userId, otpHash, expiresAt, attempts, resendCount, lastSentAt, status)
       VALUES (?, ?, ?, 0, 0, NOW(), 'pending')`,
      [user.id, otpHash, expiresAt]
    );

    const sendRes = await sendOtpEmail(email, code);
    if (!sendRes.success) {
      // Gracefully handle email delivery failure
      return res.status(201).json({ success: true, user, token: signToken(user), emailDelivery: 'failed' });
    }

    return res.status(201).json({ success: true, user, token: signToken(user), emailDelivery: 'sent' });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Registration failed' });
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, email, firstName, lastName, role, phone, isVerified, verifiedAt FROM users WHERE id = ? LIMIT 1',
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

router.post('/verify-otp', authMiddleware, verifyOtpLimiter, async (req, res) => {
  const { code } = req.body;
  if (!code || !/^\d{6}$/.test(code)) {
    return res.status(400).json({ error: 'Invalid code format' });
  }

  try {
    const userId = req.user.id;
    const [rows] = await pool.query(
      `SELECT * FROM user_email_otps WHERE userId = ? AND status = 'pending' ORDER BY createdAt DESC LIMIT 1`,
      [userId]
    );
    const record = rows[0];
    if (!record) {
      await pool.query(
        `INSERT INTO otp_verification_logs (userId, success, reason, ipAddress, userAgent) VALUES (?, 0, ?, ?, ?)`,
        [userId, 'NO_PENDING_OTP', req.ip, req.headers['user-agent'] || null]
      );
      return res.status(404).json({ error: 'No pending verification code' });
    }

    if (new Date(record.expiresAt).getTime() < Date.now()) {
      await pool.query(`UPDATE user_email_otps SET status = 'expired' WHERE id = ?`, [record.id]);
      await pool.query(
        `INSERT INTO otp_verification_logs (userId, success, reason, ipAddress, userAgent) VALUES (?, 0, ?, ?, ?)`,
        [userId, 'OTP_EXPIRED', req.ip, req.headers['user-agent'] || null]
      );
      return res.status(410).json({ error: 'Code expired' });
    }

    if (record.attempts >= 5) {
      await pool.query(
        `INSERT INTO otp_verification_logs (userId, success, reason, ipAddress, userAgent) VALUES (?, 0, ?, ?, ?)`,
        [userId, 'TOO_MANY_ATTEMPTS', req.ip, req.headers['user-agent'] || null]
      );
      return res.status(429).json({ error: 'Too many attempts' });
    }

    const match = await bcrypt.compare(code, record.otpHash);
    await pool.query(`UPDATE user_email_otps SET attempts = attempts + 1 WHERE id = ?`, [record.id]);

    if (!match) {
      await pool.query(
        `INSERT INTO otp_verification_logs (userId, success, reason, ipAddress, userAgent) VALUES (?, 0, ?, ?, ?)`,
        [userId, 'INVALID_CODE', req.ip, req.headers['user-agent'] || null]
      );
      return res.status(400).json({ error: 'Invalid code' });
    }

    await pool.query(`UPDATE user_email_otps SET status = 'verified', verifiedAt = NOW() WHERE id = ?`, [record.id]);
    await pool.query(`UPDATE users SET isVerified = 1, verifiedAt = NOW() WHERE id = ?`, [userId]);
    await pool.query(
      `INSERT INTO otp_verification_logs (userId, success, reason, ipAddress, userAgent) VALUES (?, 1, 'VERIFIED', ?, ?)`,
      [userId, req.ip, req.headers['user-agent'] || null]
    );

    const [userRows] = await pool.query(
      'SELECT id, email, firstName, lastName, role, phone, isVerified, verifiedAt FROM users WHERE id = ? LIMIT 1',
      [userId]
    );
    const user = userRows[0];
    const token = signToken(user);
    return res.json({ success: true, token, user });
  } catch (err) {
    console.error('Verify OTP error:', err);
    return res.status(500).json({ error: 'Verification failed' });
  }
});

router.post('/resend-otp', authMiddleware, resendOtpLimiter, async (req, res) => {
  try {
    const userId = req.user.id;
    const [uRows] = await pool.query('SELECT email, isVerified FROM users WHERE id = ? LIMIT 1', [userId]);
    const u = uRows[0];
    if (!u) return res.status(404).json({ error: 'User not found' });
    if (u.isVerified) return res.status(400).json({ error: 'Already verified' });

    const [rows] = await pool.query(
      `SELECT * FROM user_email_otps WHERE userId = ? AND status = 'pending' ORDER BY createdAt DESC LIMIT 1`,
      [userId]
    );
    const record = rows[0];
    if (record && record.resendCount >= 3) {
      return res.status(429).json({ error: 'Max resend attempts reached' });
    }

    if (record) {
      await pool.query(`UPDATE user_email_otps SET status = 'expired' WHERE id = ?`, [record.id]);
    }

    const code = generateOtp();
    const otpHash = await bcrypt.hash(code, 10);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    const [ins] = await pool.query(
      `INSERT INTO user_email_otps (userId, otpHash, expiresAt, attempts, resendCount, lastSentAt, status)
       VALUES (?, ?, ?, 0, ?, NOW(), 'pending')`,
      [userId, otpHash, expiresAt, (record ? Math.min(record.resendCount + 1, 3) : 1)]
    );

    const sendRes = await sendOtpEmail(u.email, code);
    if (!sendRes.success) {
      return res.status(500).json({ error: 'Failed to send code' });
    }
    return res.json({ success: true });
  } catch (err) {
    console.error('Resend OTP error:', err);
    return res.status(500).json({ error: 'Resend failed' });
  }
});

module.exports = router;
