const express   = require('express');
const dotenv    = require('dotenv');
const cors      = require('cors');
const path      = require('path');

dotenv.config();

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Routes ──────────────────────────────────────────────────────────────
app.use('/api/auth',      require('./routes/authRoutes'));
app.use('/api/services',  require('./routes/serviceRoutes'));
app.use('/api/portfolio', require('./routes/portfolioRoutes'));
app.use('/api/blog',      require('./routes/blogRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));
app.use('/api/meetings',  require('./routes/meetingRoutes'));

// ── Health Check ────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'DevelopersHub API is running ✅ (Supabase Edition)' });
});

// ── 404 Handler ─────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ── Error Handler ───────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🗄️  Database: Supabase (PostgreSQL)`);
  console.log(`📡 API: http://localhost:${PORT}`);
});
