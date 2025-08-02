require('dotenv').config();

const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'default-secret';
const API_KEY = process.env.API_KEY;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    PORT,
    SESSION_SECRET,
    API_KEY,
    BOT_TOKEN,
    NODE_ENV
}