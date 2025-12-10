const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const requireVerified = require('../middleware/requireVerified');

const router = express.Router();

let users = [
  { id: 1, email: 'admin@demo.test', firstName: 'Demo', lastName: 'Admin', role: 'admin', phone: null, status: 'active' },
  { id: 2, email: 'client@demo.test', firstName: 'Demo', lastName: 'Client', role: 'client', phone: null, status: 'active' },
  { id: 3, email: 'preparer@demo.test', firstName: 'Demo', lastName: 'Preparer', role: 'tax_professional', phone: null, status: 'active' },
  { id: 4, email: 'manager@demo.test', firstName: 'Demo', lastName: 'Manager', role: 'manager', phone: null, status: 'active' },
  { id: 5, email: 'employee@demo.test', firstName: 'Demo', lastName: 'Employee', role: 'employee', phone: null, status: 'active' }
];

router.get('/', authMiddleware, requireVerified, async (req, res) => {
  const page = Math.max(parseInt(req.query.page || '1', 10), 1);
  const limit = Math.max(parseInt(req.query.limit || '10', 10), 1);
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = users.slice(start, end);
  res.json({ data, page, limit, total: users.length });
});

router.get('/:id', authMiddleware, requireVerified, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ data: user });
});

module.exports = router;
