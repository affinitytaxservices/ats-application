const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

// GET /api/admin/dashboard/stats
router.get('/dashboard/stats', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const [[{ totalUsers }]] = await pool.query('SELECT COUNT(*) AS totalUsers FROM users');
    const [[{ totalClients }]] = await pool.query('SELECT COUNT(*) AS totalClients FROM clients');
    const [[{ totalAppointments }]] = await pool.query('SELECT COUNT(*) AS totalAppointments FROM appointments');
    const [[{ totalReturnsFiled }]] = await pool.query("SELECT COUNT(*) AS totalReturnsFiled FROM tax_returns WHERE status IN ('filed','accepted','amended')");
    const [[{ totalReturnsRejected }]] = await pool.query("SELECT COUNT(*) AS totalReturnsRejected FROM tax_returns WHERE status = 'rejected'");
    const [[{ totalRevenue }]] = await pool.query("SELECT COALESCE(SUM(amount),0) AS totalRevenue FROM payments WHERE paymentStatus = 'completed'");

    return res.json({
      data: {
        totalUsers,
        totalClients,
        totalAppointments,
        totalReturnsFiled,
        totalReturnsRejected,
        totalRevenue: Number(totalRevenue || 0)
      }
    });
  } catch (err) {
    console.error('Admin dashboard stats error:', err);
    return res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// GET /api/admin/system-health
router.get('/system-health', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM system_health ORDER BY lastChecked DESC LIMIT 50');
    return res.json({ data: rows });
  } catch (err) {
    console.error('System health error:', err);
    return res.status(500).json({ error: 'Failed to fetch system health' });
  }
});

// GET /api/admin/audit-logs
router.get('/audit-logs', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.max(parseInt(req.query.limit || '10', 10), 1);
    const offset = (page - 1) * limit;

    const [rows] = await pool.query(
      'SELECT * FROM audit_logs ORDER BY createdAt DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
    const [[{ total }]] = await pool.query('SELECT COUNT(*) AS total FROM audit_logs');

    return res.json({ data: rows, page, limit, total });
  } catch (err) {
    console.error('Audit logs error:', err);
    return res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

// GET /api/admin/users/:userId/activity
router.get('/users/:userId/activity', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;
    let sql = 'SELECT * FROM user_activity WHERE userId = ?';
    const params = [userId];
    if (startDate) {
      sql += ' AND createdAt >= ?';
      params.push(startDate);
    }
    if (endDate) {
      sql += ' AND createdAt <= ?';
      params.push(endDate);
    }
    sql += ' ORDER BY createdAt DESC LIMIT 100';

    const [rows] = await pool.query(sql, params);
    return res.json({ data: rows });
  } catch (err) {
    console.error('User activity error:', err);
    return res.status(500).json({ error: 'Failed to fetch user activity' });
  }
});

// GET /api/admin/analytics/revenue
router.get('/analytics/revenue', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const period = (req.query.period || 'month').toLowerCase();
    if (period === 'year') {
      const [rows] = await pool.query(
        `SELECT YEAR(period) AS year,
                SUM(revenue) AS revenue,
                SUM(expenses) AS expenses,
                SUM(profit) AS profit
         FROM revenue_analytics
         GROUP BY YEAR(period)
         ORDER BY year DESC`
      );
      return res.json({ data: rows });
    } else {
      const [rows] = await pool.query(
        'SELECT period, revenue, expenses, profit FROM revenue_analytics ORDER BY period DESC LIMIT 24'
      );
      return res.json({ data: rows });
    }
  } catch (err) {
    console.error('Revenue analytics error:', err);
    return res.status(500).json({ error: 'Failed to fetch revenue analytics' });
  }
});

// GET /api/admin/task-analytics
router.get('/task-analytics', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const [statusRows] = await pool.query(
      'SELECT status, COUNT(*) AS count FROM tasks GROUP BY status'
    );
    const [priorityRows] = await pool.query(
      'SELECT priority, COUNT(*) AS count FROM tasks GROUP BY priority'
    );
    const [[{ total }]] = await pool.query('SELECT COUNT(*) AS total FROM tasks');
    return res.json({ data: { byStatus: statusRows, byPriority: priorityRows, total } });
  } catch (err) {
    console.error('Task analytics error:', err);
    return res.status(500).json({ error: 'Failed to fetch task analytics' });
  }
});

// GET /api/admin/export/:dataType
router.get('/export/:dataType', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const { dataType } = req.params;
    const tableMap = {
      users: 'users',
      clients: 'clients',
      tax_returns: 'tax_returns',
      payments: 'payments',
      appointments: 'appointments'
    };
    const table = tableMap[dataType];
    if (!table) return res.status(400).json({ error: 'Unsupported export type' });

    const [rows] = await pool.query(`SELECT * FROM ${table} LIMIT 1000`);
    const headers = rows.length ? Object.keys(rows[0]) : [];
    const csv = [headers.join(',')]
      .concat(
        rows.map((r) =>
          headers.map((h) => {
            const val = r[h];
            if (val == null) return '';
            const str = String(val).replace(/"/g, '""');
            return /,|\n|"/.test(str) ? `"${str}"` : str;
          }).join(',')
        )
      )
      .join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${dataType}.csv`);
    return res.send(csv);
  } catch (err) {
    console.error('Export error:', err);
    return res.status(500).json({ error: 'Failed to export data' });
  }
});

// POST /api/admin/backup
router.post('/backup', authMiddleware, requireAdmin, async (req, res) => {
  try {
    // Stub: In a real implementation, trigger backup job
    return res.json({ success: true, message: 'Backup initiated' });
  } catch (err) {
    console.error('Backup error:', err);
    return res.status(500).json({ error: 'Failed to start backup' });
  }
});

// GET /api/admin/settings and PUT /api/admin/settings
router.get('/settings', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, type, value, description, createdAt, updatedAt FROM settings');
    return res.json({ data: rows });
  } catch (err) {
    console.error('Settings fetch error:', err);
    return res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

router.put('/settings', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const { settings } = req.body;
    if (!Array.isArray(settings)) return res.status(400).json({ error: 'Invalid settings payload' });
    const now = new Date();
    for (const s of settings) {
      if (!s.type) continue;
      const [exists] = await pool.query('SELECT id FROM settings WHERE type = ? LIMIT 1', [s.type]);
      if (exists.length) {
        await pool.query('UPDATE settings SET value = ?, description = ?, updatedAt = ? WHERE id = ?', [s.value || '', s.description || null, now, exists[0].id]);
      } else {
        await pool.query('INSERT INTO settings (value, type, description, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)', [s.value || '', s.type, s.description || null, now, now]);
      }
    }
    return res.json({ success: true });
  } catch (err) {
    console.error('Settings update error:', err);
    return res.status(500).json({ error: 'Failed to update settings' });
  }
});

module.exports = router;