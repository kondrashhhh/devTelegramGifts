const cors = require('cors');
const express = require('express');
const session = require('express-session');
const { validateTelegramAuth, getTelegramUserData } = require('./auth/auth.js');
const caseData = require('./caseData.js');
require('dotenv').config();

const app = express();


const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET;
const API_KEY = process.env.API_KEY;

const allowedOrigins = [
  'http://localhost:5173',
  'https://f224-45-87-212-41.ngrok-free.app'
];

// Улучшенная CORS конфигурация
const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

// Применяем CORS только к конкретным маршрутам
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('*name', cors(corsOptions))

// Настройка сессии
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    httpOnly: true
  }
}));

app.post(
  '/api/telegram-auth',
  validateTelegramAuth(process.env.TELEGRAM_BOT_TOKEN),
  (req, res) => {
    const userData = getTelegramUserData(req);
    res.json({ 
      success: true,
      user: userData
    });
  }
);

const getItemPrice = require('./slider/slider');

app.get('/get-assets', (req, res) => {
    getItemPrice(API_KEY, 730, res);
});

app.get('/api/cases', (req, res) => {
    console.log(caseData);
    res.json(caseData);
});

app.get('/api/case/:id', (req, res) => {
  const caseId = req.params.id.toLowerCase();
  console.log(caseId);
  let foundCase = null;

  for (const category of caseData) {
    foundCase = category.cases.find(item => item.id.toLowerCase() === caseId);
    if (foundCase) break;
  }

  if (foundCase) {
    res.json(foundCase);
  } else {
    res.status(404).json({ error: 'Кейс не найден' });
  }
});




app.listen(PORT, '0.0.0.0', () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
