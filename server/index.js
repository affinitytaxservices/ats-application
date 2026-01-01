const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  'https://www.affinitytaxservices.com',
  'https://affinitytaxservices.com',
  'https://api.affinitytaxservices.com',
  'http://195.250.21.159',
  'https://195.250.21.159',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5000',
  ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:3000'] : [])
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
const requestLogger = require('./middleware/requestLogger');
app.use(requestLogger);

// Health check with simple cache
const Cache = require('./utils/cache');
const healthCache = new Cache(5000);
app.get('/health', (req, res) => {
  const cached = healthCache.get('health');
  if (cached) {
    return res.json(cached);
  }
  const payload = { status: 'ok', timestamp: new Date().toISOString() };
  healthCache.set('health', payload);
  res.json(payload);
});

// API routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const clientRoutes = require('./routes/client');
app.use('/api/client', clientRoutes);
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);
const whatsappRoutes = require('./routes/whatsapp');
app.use('/api/whatsapp', whatsappRoutes);
const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);
const errorRoutes = require('./routes/errors');
app.use('/api/errors', errorRoutes);
// Contact API
const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

// Users API
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// Serve React production build
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

// Favicon compatibility: serve SVG for /favicon.ico requests
app.get('/favicon.ico', (_req, res) => {
  const svgPath = path.join(__dirname, '..', 'public', 'favicon.svg');
  res.type('image/svg+xml');
  res.sendFile(svgPath);
});

// SPA fallback for client-side routes
app.use((req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
