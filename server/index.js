const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  'https://www.affinitytaxservices.com',
  'https://affinitytaxservices.com',
  'https://api.affinitytaxservices.com',
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
app.options('*', cors(corsOptions));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const clientRoutes = require('./routes/client');
app.use('/api/client', clientRoutes);
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

// TODO: Add more routes incrementally to replace mocks
// const userRoutes = require('./routes/users');
// app.use('/api/users', userRoutes);
// const documentRoutes = require('./routes/documents');
// app.use('/api/documents', documentRoutes);
// const taxReturnRoutes = require('./routes/taxReturns');
// app.use('/api/tax_returns', taxReturnRoutes);
// const appointmentRoutes = require('./routes/appointments');
// app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});