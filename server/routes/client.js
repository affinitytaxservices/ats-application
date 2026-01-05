const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const requireVerified = require('../middleware/requireVerified');

const router = express.Router();

// Helper: get clientId by userId
async function getClientIdByUser(userId) {
  const [rows] = await pool.query('SELECT id FROM clients WHERE userId = ? LIMIT 1', [userId]);
  return rows[0]?.id || null;
}

// GET /api/client/dashboard
router.get('/dashboard', authMiddleware, requireVerified, async (req, res) => {
  try {
    const userId = req.user.id;
    const clientId = await getClientIdByUser(userId);

    // Recent documents
    const [docs] = await pool.query(
      `SELECT id, name, type, path, size, uploadDate
       FROM documents
       WHERE userId = ?
       ORDER BY uploadDate DESC
       LIMIT 10`,
      [userId]
    );

    // Notifications
    const [notes] = await pool.query(
      `SELECT id, type, title, message, isRead, createdAt
       FROM notifications
       WHERE userId = ?
       ORDER BY createdAt DESC
       LIMIT 10`,
      [userId]
    );

    // Tax summary from tax_returns and payments
    let taxSummary = {
      totalIncome: 0,
      totalDeductions: 0,
      estimatedTax: 0,
      taxPaid: 0
    };

    if (clientId) {
      const [summaryRows] = await pool.query(
        `SELECT COALESCE(SUM(totalIncome),0) AS totalIncome,
                COALESCE(SUM(totalDeductions),0) AS totalDeductions,
                COALESCE(SUM(taxLiability),0) AS taxLiability
         FROM tax_returns WHERE clientId = ?`,
        [clientId]
      );

      const [paymentRows] = await pool.query(
        `SELECT COALESCE(SUM(amount),0) AS totalPaid
         FROM payments
         WHERE clientId = ? AND paymentStatus = 'completed'`,
        [clientId]
      );

      taxSummary = {
        totalIncome: Number(summaryRows[0]?.totalIncome || 0),
        totalDeductions: Number(summaryRows[0]?.totalDeductions || 0),
        estimatedTax: Number(summaryRows[0]?.taxLiability || 0),
        taxPaid: Number(paymentRows[0]?.totalPaid || 0)
      };
    }

    // Upcoming appointments
    const [appts] = await pool.query(
      `SELECT id, date, status, notes
       FROM appointments
       WHERE clientId = ? AND date >= NOW()
       ORDER BY date ASC
       LIMIT 5`,
      [clientId || 0]
    );

    return res.json({
      recentDocuments: docs,
      notifications: notes,
      taxSummary,
      upcomingAppointments: appts
    });
  } catch (err) {
    console.error('Client dashboard error:', err);
    if (process.env.NODE_ENV !== 'production') {
      return res.json({
        recentDocuments: [
          { id: 1, name: 'Tax Return 2024.pdf', type: 'application/pdf', size: 1024000, uploadDate: new Date() },
          { id: 2, name: 'W2 Form.jpg', type: 'image/jpeg', size: 500000, uploadDate: new Date() }
        ],
        notifications: [
          { id: 1, type: 'info', title: 'Welcome', message: 'Welcome to your dashboard', isRead: 0, createdAt: new Date() }
        ],
        taxSummary: { totalIncome: 50000, totalDeductions: 10000, estimatedTax: 5000, taxPaid: 4000 },
        upcomingAppointments: [
          { id: 1, date: new Date(Date.now() + 86400000), status: 'scheduled', notes: 'Tax consultation' }
        ]
      });
    }
    return res.status(500).json({ error: 'Failed to load client dashboard' });
  }
});

// GET /api/client/documents
router.get('/documents', authMiddleware, requireVerified, async (req, res) => {
  try {
    const userId = req.user.id;
    const [docs] = await pool.query(
      `SELECT id, name, type, path, size, uploadDate
       FROM documents
       WHERE userId = ?
       ORDER BY uploadDate DESC`,
      [userId]
    );
    return res.json({ data: docs });
  } catch (err) {
    console.error('Client documents error:', err);
    console.log('DEBUG: NODE_ENV=', process.env.NODE_ENV);
    if (process.env.NODE_ENV !== 'production') {
      console.log('DEBUG: Returning mock documents');
      return res.json({
        data: [
          { id: 1, name: 'Tax Return 2024.pdf', type: 'application/pdf', size: 1024000, uploadDate: new Date() },
          { id: 2, name: 'W2 Form.jpg', type: 'image/jpeg', size: 500000, uploadDate: new Date() }
        ]
      });
    }
    return res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

// GET /api/client/notifications
router.get('/notifications', authMiddleware, requireVerified, async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query(
      `SELECT id, type, title, message, isRead, createdAt
       FROM notifications
       WHERE userId = ?
       ORDER BY createdAt DESC`,
      [userId]
    );
    return res.json({ data: rows });
  } catch (err) {
    console.error('Client notifications error:', err);
    if (process.env.NODE_ENV !== 'production') {
      return res.json({
        data: [
          { id: 1, type: 'info', title: 'Welcome', message: 'Welcome to your dashboard', isRead: 0, createdAt: new Date() }
        ]
      });
    }
    return res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// GET /api/client/tax-summary
router.get('/tax-summary', authMiddleware, requireVerified, async (req, res) => {
  try {
    const clientId = await getClientIdByUser(req.user.id);
    if (!clientId) return res.json({ data: { totalIncome: 0, totalDeductions: 0, estimatedTax: 0, taxPaid: 0 } });

    const [summaryRows] = await pool.query(
      `SELECT COALESCE(SUM(totalIncome),0) AS totalIncome,
              COALESCE(SUM(totalDeductions),0) AS totalDeductions,
              COALESCE(SUM(taxLiability),0) AS taxLiability
       FROM tax_returns WHERE clientId = ?`,
      [clientId]
    );

    const [paymentRows] = await pool.query(
      `SELECT COALESCE(SUM(amount),0) AS totalPaid
       FROM payments
       WHERE clientId = ? AND paymentStatus = 'completed'`,
      [clientId]
    );

    return res.json({
      data: {
        totalIncome: Number(summaryRows[0]?.totalIncome || 0),
        totalDeductions: Number(summaryRows[0]?.totalDeductions || 0),
        estimatedTax: Number(summaryRows[0]?.taxLiability || 0),
        taxPaid: Number(paymentRows[0]?.totalPaid || 0)
      }
    });
  } catch (err) {
    console.error('Client tax-summary error:', err);
    if (process.env.NODE_ENV !== 'production') {
      return res.json({
        data: { totalIncome: 50000, totalDeductions: 10000, estimatedTax: 5000, taxPaid: 4000 }
      });
    }
    return res.status(500).json({ error: 'Failed to fetch tax summary' });
  }
});

// GET /api/client/appointments
router.get('/appointments', authMiddleware, requireVerified, async (req, res) => {
  try {
    const clientId = await getClientIdByUser(req.user.id);
    const [rows] = await pool.query(
      `SELECT id, date, status, notes
       FROM appointments
       WHERE clientId = ?
       ORDER BY date DESC`,
      [clientId || 0]
    );
    return res.json({ data: rows });
  } catch (err) {
    console.error('Client appointments error:', err);
    if (process.env.NODE_ENV !== 'production') {
      return res.json({
        data: [
          { id: 1, date: new Date(Date.now() + 86400000), status: 'scheduled', notes: 'Tax consultation' }
        ]
      });
    }
    return res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

module.exports = router;
