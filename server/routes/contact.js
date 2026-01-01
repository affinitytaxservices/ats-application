const express = require('express');
const rateLimit = require('express-rate-limit');
const pool = require('../db');
const { sendContactEmail } = require('../utils/mailer');

const router = express.Router();

// Rate limit: max 10 submissions per hour per IP
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', limiter, async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message, phone, website } = req.body || {};

    // Honeypot field for bots
    if (website) {
      return res.status(400).json({ success: false, error: 'SPAM_DETECTED' });
    }

    const errors = {};
    if (!firstName || !firstName.trim()) errors.firstName = 'First name is required';
    if (!lastName || !lastName.trim()) errors.lastName = 'Last name is required';
    if (!email || !email.trim()) errors.email = 'Email is required';
    else if (!/^([^\s@]+)@([^\s@]+)\.[^\s@]+$/.test(email)) errors.email = 'Invalid email';
    if (!subject || !subject.trim()) errors.subject = 'Subject is required';
    if (!message || !message.trim()) errors.message = 'Message is required';

    if (Object.keys(errors).length) {
      return res.status(422).json({ success: false, errors });
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || null;

    const [result] = await pool.execute(
      `INSERT INTO contact_messages (first_name, last_name, email, phone, subject, message, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [firstName.trim(), lastName.trim(), email.trim(), phone || null, subject.trim(), message.trim(), ip, userAgent]
    );

    // Notify via email (best-effort)
    try {
      await sendContactEmail({ firstName, lastName, email, phone, subject, message });
    } catch (_) {}

    return res.json({ success: true, id: result.insertId });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'INTERNAL_ERROR' });
  }
});

module.exports = router;

