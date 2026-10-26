require('dotenv').config();

const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'default-secret';
const API_KEY = process.env.API_KEY;
const BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_BOT_USERNAME = process.env.TELEGRAM_BOT_USERNAME;
const APP_URL = process.env.APP_URL;
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    PORT,
    SESSION_SECRET,
    API_KEY,
    BOT_TOKEN,
    TELEGRAM_BOT_USERNAME,
    APP_URL,
    NODE_ENV
}