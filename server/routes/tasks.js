const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

let tasks = [];
let nextId = 1;

router.get('/', authMiddleware, async (req, res) => {
  const page = Math.max(parseInt(req.query.page || '1', 10), 1);
  const limit = Math.max(parseInt(req.query.limit || '10', 10), 1);
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = tasks.slice(start, end);
  res.json({ data, page, limit, total: tasks.length });
});

router.get('/:id', authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json({ data: task });
});

router.post('/', authMiddleware, async (req, res) => {
  const body = req.body || {};
  const task = {
    id: nextId++,
    title: body.title || 'Untitled Task',
    description: body.description || '',
    status: body.status || 'pending',
    priority: body.priority || 'medium',
    assigneeId: body.assigneeId || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  tasks.push(task);
  res.status(201).json({ data: task });
});

router.put('/:id', authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });
  const updated = { ...tasks[idx], ...req.body, updatedAt: new Date().toISOString() };
  tasks[idx] = updated;
  res.json({ data: updated });
});

router.put('/:id/status', authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });
  const status = req.body.status || tasks[idx].status;
  const notes = req.body.notes || tasks[idx].notes;
  tasks[idx] = { ...tasks[idx], status, notes, updatedAt: new Date().toISOString() };
  res.json({ data: tasks[idx] });
});

router.patch('/:id/status', authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });
  const status = req.body.status || tasks[idx].status;
  const notes = req.body.notes || tasks[idx].notes;
  tasks[idx] = { ...tasks[idx], status, notes, updatedAt: new Date().toISOString() };
  res.json({ data: tasks[idx] });
});

router.put('/:id/assign', authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });
  const assigneeId = req.body.assigneeId || null;
  tasks[idx] = { ...tasks[idx], assigneeId, updatedAt: new Date().toISOString() };
  res.json({ data: tasks[idx] });
});

router.patch('/:id/assign', authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });
  const assigneeId = req.body.assigneeId || req.body.assignedTo || null;
  tasks[idx] = { ...tasks[idx], assigneeId, updatedAt: new Date().toISOString() };
  res.json({ data: tasks[idx] });
});

router.get('/statistics', authMiddleware, async (_req, res) => {
  const counts = tasks.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});
  const statusDistribution = [
    { name: 'Pending', value: counts['pending'] || 0 },
    { name: 'In Progress', value: counts['in_progress'] || counts['assigned'] || 0 },
    { name: 'Completed', value: counts['completed'] || 0 }
  ];
  res.json({ data: { statusDistribution } });
});

router.get('/employees', authMiddleware, async (_req, res) => {
  const employees = [
    { id: 1, name: 'Alice Johnson', department: 'Tax Preparation' },
    { id: 2, name: 'Bob Smith', department: 'Business Tax' },
    { id: 3, name: 'Carol Lee', department: 'Support' }
  ];
  res.json({ data: employees });
});

router.get('/employee/:employeeId', authMiddleware, async (req, res) => {
  const employeeId = parseInt(req.params.employeeId, 10);
  const data = tasks.filter(t => t.assigneeId === employeeId);
  res.json({ data });
});

router.post('/:id/comments', authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });
  const comment = {
    text: req.body.text || '',
    author: req.body.author || 'System',
    createdAt: new Date().toISOString()
  };
  tasks[idx].comments = [...(tasks[idx].comments || []), comment];
  res.json({ data: tasks[idx] });
});

router.post('/:id/attachments', authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });
  tasks[idx].attachments = [...(tasks[idx].attachments || []), { name: 'file', uploadedAt: new Date().toISOString() }];
  res.json({ data: tasks[idx] });
});

router.patch('/:id/submit', authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });
  tasks[idx] = { ...tasks[idx], status: 'submitted', submissionNotes: req.body.submissionNotes || '', submittedAt: new Date().toISOString() };
  res.json({ data: tasks[idx] });
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });
  const [removed] = tasks.splice(idx, 1);
  res.json({ data: removed });
});

module.exports = router;
