const express = require("express");
const { validateTelegramAuth } = require('../auth/auth.js');
const authController = require("../controllers/authController.js");
const authRouter = express.Router();

authRouter.get('/telegram/start', authController.startTelegramLogin);
authRouter.get('/telegram/status', authController.getTelegramLoginStatus);
authRouter.post('/telegram/complete', authController.completeTelegramLogin);

authRouter.get('/me', authController.getCurrentUser);
authRouter.get('/profile', authController.getCurrentUser);
authRouter.post('/profile', authController.saveUserState);
authRouter.post('/', 
  validateTelegramAuth(process.env.BOT_TOKEN),
  authController.authorization
);

authRouter.post('/telegram-auth', 
  validateTelegramAuth(process.env.BOT_TOKEN),
  authController.authorization
);

module.exports = authRouter;