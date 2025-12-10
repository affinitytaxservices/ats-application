const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const requireVerified = require('../middleware/requireVerified');

const router = express.Router();

function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

// GET /api/admin/dashboard/stats
router.get('/dashboard/stats', authMiddleware, requireVerified, requireAdmin, async (req, res) => {
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
    if (process.env.NODE_ENV !== 'production') {
      return res.json({
        data: {
          totalUsers: 5,
          totalClients: 3,
          totalAppointments: 2,
          totalReturnsFiled: 1,
          totalReturnsRejected: 0,
          totalRevenue: 0
        }
      });
    }
    return res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// GET /api/admin/system-health
router.get('/system-health', authMiddleware, requireVerified, requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM system_health ORDER BY lastChecked DESC LIMIT 50');
    return res.json({ data: rows });
  } catch (err) {
    console.error('System health error:', err);
    if (process.env.NODE_ENV !== 'production') {
      return res.json({
        data: [
          { id: 1, status: 'ok', service: 'api', lastChecked: new Date(), message: 'Healthy' },
          { id: 2, status: 'warning', service: 'db', lastChecked: new Date(), message: 'Dev database not available' }
        ]
      });
    }
    return res.status(500).json({ error: 'Failed to fetch system health' });
  }
});

// GET /api/admin/audit-logs
router.get('/audit-logs', authMiddleware, requireVerified, requireAdmin, async (req, res) => {
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
router.get('/users/:userId/activity', authMiddleware, requireVerified, requireAdmin, async (req, res) => {
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
    if (process.env.NODE_ENV !== 'production') {
      return res.json({ data: [] });
    }
    return res.status(500).json({ error: 'Failed to fetch user activity' });
  }
});

// GET /api/admin/analytics/revenue
router.get('/analytics/revenue', authMiddleware, requireVerified, requireAdmin, async (req, res) => {
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
    if (process.env.NODE_ENV !== 'production') {
      const now = new Date();
      const rows = Array.from({ length: 6 }).map((_, i) => {
        const d = new Date(now);
        d.setMonth(d.getMonth() - i);
        const period = d.toISOString().slice(0, 10);
        return { period, revenue: 0, expenses: 0, profit: 0 };
      });
      return res.json({ data: rows });
    }
    return res.status(500).json({ error: 'Failed to fetch revenue analytics' });
  }
});

// GET /api/admin/task-analytics
router.get('/task-analytics', authMiddleware, requireVerified, requireAdmin, async (req, res) => {
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
    if (process.env.NODE_ENV !== 'production') {
      return res.json({ data: { byStatus: [ { status: 'open', count: 3 }, { status: 'in_progress', count: 2 }, { status: 'completed', count: 1 } ], byPriority: [ { priority: 'high', count: 2 }, { priority: 'medium', count: 3 }, { priority: 'low', count: 1 } ], total: 6 } });
    }
    return res.status(500).json({ error: 'Failed to fetch task analytics' });
  }
});

// GET /api/admin/export/:dataType
router.get('/export/:dataType', authMiddleware, requireVerified, requireAdmin, async (req, res) => {
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
router.post('/backup', authMiddleware, requireVerified, requireAdmin, async (req, res) => {
  try {
    // Stub: In a real implementation, trigger backup job
    return res.json({ success: true, message: 'Backup initiated' });
  } catch (err) {
    console.error('Backup error:', err);
    return res.status(500).json({ error: 'Failed to start backup' });
  }
});

// GET /api/admin/settings and PUT /api/admin/settings
router.get('/settings', authMiddleware, requireVerified, requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, type, value, description, createdAt, updatedAt FROM settings');
    return res.json({ data: rows });
  } catch (err) {
    console.error('Settings fetch error:', err);
    return res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

router.put('/settings', authMiddleware, requireVerified, requireAdmin, async (req, res) => {
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

// WhatsApp admin endpoints
// GET /api/admin/whatsapp/conversations
router.get('/whatsapp/conversations', authMiddleware, requireVerified, requireAdmin, async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.max(parseInt(req.query.limit || '20', 10), 1);
    const offset = (page - 1) * limit;
    const search = req.query.search || '';

    let sql = `
      SELECT wc.*, 
             COUNT(wm.id) as message_count,
             MAX(wm.created_at) as last_message_at
      FROM whatsapp_conversations wc
      LEFT JOIN whatsapp_messages wm ON wc.phone_number = wm.phone_number
    `;
    
    const params = [];
    if (search) {
      sql += ' WHERE wc.phone_number LIKE ?';
      params.push(`%${search}%`);
    }
    
    sql += ' GROUP BY wc.phone_number ORDER BY wc.updated_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await pool.query(sql, params);
    
    const [[{ total }]] = await pool.query(
      'SELECT COUNT(DISTINCT phone_number) as total FROM whatsapp_conversations' +
      (search ? ' WHERE phone_number LIKE ?' : ''),
      search ? [`%${search}%`] : []
    );

    return res.json({ data: rows, page, limit, total });
  } catch (err) {
    console.error('WhatsApp conversations error:', err);
    if (process.env.NODE_ENV !== 'production') {
      return res.json({ data: [
        { id: 1, phone_number: '15551234567', state: 'MENU', data: null, updated_at: new Date().toISOString(), message_count: 3, last_message_at: new Date().toISOString() }
      ], page: 1, limit: 20, total: 1 });
    }
    return res.status(500).json({ error: 'Failed to fetch WhatsApp conversations' });
  }
});

// GET /api/admin/whatsapp/messages/:phone
router.get('/whatsapp/messages/:phone', authMiddleware, requireVerified, requireAdmin, async (req, res) => {
  try {
    const phone = req.params.phone.replace(/\D/g, '');
    const limit = Math.max(parseInt(req.query.limit || '50', 10), 1);
    
    const [rows] = await pool.query(
      `SELECT * FROM whatsapp_messages 
       WHERE phone_number = ? 
       ORDER BY created_at DESC 
       LIMIT ?`,
      [phone, limit]
    );
    
    return res.json({ data: rows });
  } catch (err) {
    console.error('WhatsApp messages error:', err);
    if (process.env.NODE_ENV !== 'production') {
      return res.json({ data: [
        { id: 1, phone_number: req.params.phone.replace(/\D/g, ''), message_id: 'demo1', message: 'Hello', direction: 'inbound', message_type: 'text', created_at: new Date().toISOString() },
        { id: 2, phone_number: req.params.phone.replace(/\D/g, ''), message_id: 'demo2', message: 'Hi there!', direction: 'outbound', message_type: 'text', created_at: new Date().toISOString() }
      ] });
    }
    return res.status(500).json({ error: 'Failed to fetch WhatsApp messages' });
  }
});

// GET /api/admin/whatsapp/appointments
router.get('/whatsapp/appointments', authMiddleware, requireVerified, requireAdmin, async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.max(parseInt(req.query.limit || '20', 10), 1);
    const offset = (page - 1) * limit;
    const status = req.query.status;
    const date = req.query.date;

    let sql = 'SELECT * FROM appointments WHERE 1=1';
    const params = [];

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }

    if (date) {
      sql += ' AND appointment_date = ?';
      params.push(date);
    }

    sql += ' ORDER BY appointment_date ASC, appointment_time ASC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await pool.query(sql, params);
    
    let countSql = 'SELECT COUNT(*) as total FROM appointments WHERE 1=1';
    const countParams = [];
    
    if (status) {
      countSql += ' AND status = ?';
      countParams.push(status);
    }
    
    if (date) {
      countSql += ' AND appointment_date = ?';
      countParams.push(date);
    }

    const [[{ total }]] = await pool.query(countSql, countParams);

    return res.json({ data: rows, page, limit, total });
  } catch (err) {
    console.error('WhatsApp appointments error:', err);
    if (process.env.NODE_ENV !== 'production') {
      return res.json({ data: [
        { id: 1, phone_number: '15551234567', appointment_date: new Date().toISOString().slice(0,10), appointment_time: '14:30', status: 'scheduled' }
      ], page: 1, limit: 20, total: 1 });
    }
    return res.status(500).json({ error: 'Failed to fetch WhatsApp appointments' });
  }
});

// PUT /api/admin/whatsapp/appointments/:id/status
router.put('/whatsapp/appointments/:id/status', authMiddleware, requireVerified, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['scheduled', 'completed', 'cancelled', 'no_show'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const [result] = await pool.query(
      'UPDATE appointments SET status = ?, updated_at = NOW() WHERE id = ?',
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error('Update appointment status error:', err);
    return res.status(500).json({ error: 'Failed to update appointment status' });
  }
});

// GET /api/admin/whatsapp/support-tickets
router.get('/whatsapp/support-tickets', authMiddleware, requireVerified, requireAdmin, async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.max(parseInt(req.query.limit || '20', 10), 1);
    const offset = (page - 1) * limit;
    const status = req.query.status;

    let sql = `
      SELECT st.*, u.name as assigned_to_name, u.email as assigned_to_email
      FROM support_tickets st
      LEFT JOIN users u ON st.assigned_to = u.id
      WHERE 1=1
    `;
    const params = [];

    if (status) {
      sql += ' AND st.status = ?';
      params.push(status);
    }

    sql += ' ORDER BY st.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await pool.query(sql, params);
    
    let countSql = 'SELECT COUNT(*) as total FROM support_tickets WHERE 1=1';
    const countParams = [];
    
    if (status) {
      countSql += ' AND status = ?';
      countParams.push(status);
    }

    const [[{ total }]] = await pool.query(countSql, countParams);

    return res.json({ data: rows, page, limit, total });
  } catch (err) {
    console.error('Support tickets error:', err);
    if (process.env.NODE_ENV !== 'production') {
      return res.json({ data: [
        { id: 1, phone_number: '15551234567', message: 'Need help', response: null, status: 'open', created_at: new Date().toISOString() }
      ], page: 1, limit: 20, total: 1 });
    }
    return res.status(500).json({ error: 'Failed to fetch support tickets' });
  }
});

// PUT /api/admin/whatsapp/support-tickets/:id/assign
router.put('/whatsapp/support-tickets/:id/assign', authMiddleware, requireVerified, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { assigned_to } = req.body;

    const [result] = await pool.query(
      'UPDATE support_tickets SET assigned_to = ?, status = "in_progress", updated_at = NOW() WHERE id = ?',
      [assigned_to, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Support ticket not found' });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error('Assign support ticket error:', err);
    return res.status(500).json({ error: 'Failed to assign support ticket' });
  }
});

// PUT /api/admin/whatsapp/support-tickets/:id/response
router.put('/whatsapp/support-tickets/:id/response', authMiddleware, requireVerified, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body;

    const [result] = await pool.query(
      'UPDATE support_tickets SET response = ?, status = "resolved", resolved_at = NOW(), updated_at = NOW() WHERE id = ?',
      [response, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Support ticket not found' });
    }

    // Send response via WhatsApp
    const [ticket] = await pool.query('SELECT phone_number FROM support_tickets WHERE id = ?', [id]);
    if (ticket.length > 0) {
      const { sendTextMessage } = require('../services/whatsappClient');
      await sendTextMessage(ticket[0].phone_number, `🎫 Support Response:\n\n${response}\n\nSend "menu" to return to main menu.`);
    }

    return res.json({ success: true });
  } catch (err) {
    console.error('Respond to support ticket error:', err);
    return res.status(500).json({ error: 'Failed to respond to support ticket' });
  }
});

// POST /api/admin/whatsapp/send-text
router.post('/whatsapp/send-text', authMiddleware, requireVerified, requireAdmin, async (req, res) => {
  try {
    const { to, text } = req.body;
    if (!to || !text) {
      return res.status(400).json({ error: 'Missing to or text parameters' });
    }

    const { sendTextMessage } = require('../services/whatsappClient');
    const messageId = await sendTextMessage(to, text);
    
    return res.json({ success: true, messageId });
  } catch (err) {
    console.error('Send WhatsApp text error:', err);
    return res.status(500).json({ error: 'Failed to send WhatsApp message' });
  }
});

// POST /api/admin/whatsapp/send-template
router.post('/whatsapp/send-template', authMiddleware, requireVerified, requireAdmin, async (req, res) => {
  try {
    const { to, template, language = 'en_US', components = [] } = req.body;
    if (!to || !template) {
      return res.status(400).json({ error: 'Missing to or template parameters' });
    }

    const { sendTemplateMessage } = require('../services/whatsappClient');
    const messageId = await sendTemplateMessage(to, template, language, components);
    
    return res.json({ success: true, messageId });
  } catch (err) {
    console.error('Send WhatsApp template error:', err);
    return res.status(500).json({ error: 'Failed to send WhatsApp template' });
  }
});

module.exports = router;
