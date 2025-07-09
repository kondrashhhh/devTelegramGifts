const cors = require('cors');
const express = require('express');
const session = require('express-session');
const { validateTelegramAuth } = require('./auth/auth.js');
const caseData = require('./caseData.js');
require('dotenv').config();

const app = express();

// Конфигурация
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'default-secret';
const API_KEY = process.env.API_KEY;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error('TELEGRAM_BOT_TOKEN is not set!');
  process.exit(1);
}

const allowedOrigins = [
  'http://localhost:5173',
  'https://dev-telegram-gifts.ru'
];

// Улучшенная конфигурация CORS
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Сессия
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 1 день
  }
}));

// Маршруты API
app.post('/api/telegram-auth', 
  validateTelegramAuth(process.env.TELEGRAM_BOT_TOKEN),
  (req, res) => {
    try {
      // Сохраняем пользователя в сессии
      req.session.telegramUser = req.telegramUser;
      
      res.json({
        success: true,
        user: req.telegramUser
      });
    } catch (error) {
      console.error('Auth endpoint error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
      });
    }
  }
);

// Маршруты для кейсов
app.get('/api/cases', (req, res) => {
  try {
    res.json(caseData);
  } catch (error) {
    console.error('Cases error:', error);
    res.status(500).json({ error: 'Failed to load cases' });
  }
});

app.get('/api/case/:id', (req, res) => {
  try {
    const caseId = req.params.id.toLowerCase();
    let foundCase = null;

    for (const category of caseData) {
      foundCase = category.cases.find(c => c.id.toLowerCase() === caseId);
      if (foundCase) break;
    }

    foundCase 
      ? res.json(foundCase)
      : res.status(404).json({ error: 'Case not found' });
  } catch (error) {
    console.error('Case error:', error);
    res.status(500).json({ error: 'Failed to get case' });
  }
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Запуск сервера
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});