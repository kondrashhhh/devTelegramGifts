const express = require("express");
const { validateTelegramAuth } = require('../auth/auth.js');
const authController = require("../controllers/authController.js");
const authRouter = express.Router();

authRouter.post('/', 
  validateTelegramAuth(process.env.TELEGRAM_BOT_TOKEN),
  authController.authorization
);

module.exports = authRouter;