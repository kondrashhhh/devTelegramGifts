const express = require("express");
const { validateTelegramAuth } = require('../auth/auth.js');
const authController = require("../controllers/authController.js");
const authRouter = express.Router();

authRouter.get('/me', authController.getCurrentUser);
authRouter.post('/profile', authController.saveUserState);
authRouter.post('/', 
  validateTelegramAuth(process.env.TELEGRAM_BOT_TOKEN),
  authController.authorization
);

authRouter.post('/telegram-auth', 
  validateTelegramAuth(process.env.TELEGRAM_BOT_TOKEN),
  authController.authorization
);

module.exports = authRouter;