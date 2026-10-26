const db = require('../db');
const crypto = require('crypto');
const { notifyUser } = require('../realtime/userSocket');

exports.authorization = async (req, res) => {
  try {
    const user = await db.upsertUser(req.telegramUser);
    req.session.telegramUser = user;

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Auth endpoint error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const telegramId = Number(req.session?.telegramUser?.telegram_id || req.session?.telegramUser?.id || req.body?.telegram_id || req.query?.telegram_id);

    if (!telegramId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }

    const user = await db.getUserByTelegramId(telegramId);

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Get current user error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

exports.saveUserState = async (req, res) => {
  try {
    const telegramId = Number(req.body?.telegram_id || req.session?.telegramUser?.telegram_id || req.session?.telegramUser?.id || req.telegramUser?.id);

    if (!telegramId) {
      return res.status(400).json({
        success: false,
        error: 'Telegram user id is required',
      });
    }

    const currentUser = await db.getUserByTelegramId(telegramId);
    const inventory = Array.isArray(currentUser?.inventory) ? currentUser.inventory : [];

    if (req.body?.inventoryItem) {
      inventory.push(req.body.inventoryItem);
    }

    const user = await db.upsertUserState(telegramId, {
      balance: req.body?.balance ?? currentUser?.balance ?? 0,
      inventory: Array.isArray(req.body?.inventory) ? req.body.inventory : inventory,
    });

    req.session.telegramUser = user;
    notifyUser(user);

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Save user state error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

exports.startTelegramLogin = async (req, res) => {
  try {
    const botUsername = process.env.TELEGRAM_BOT_USERNAME;

    if (!botUsername) {
      return res.status(500).send('Telegram bot username is not configured');
    }

    const token = crypto.randomBytes(32).toString('hex');

    await db.createTelegramLoginToken(token);

    return res.redirect(
      302,
      `https://t.me/${botUsername}?start=${token}`
    );
  } catch (error) {
    console.error('Telegram login start error:', error);

    return res.status(500).send('Could not start Telegram login');
  }
};

exports.completeTelegramLogin = async (req, res) => {
  try {
    const token = String(req.query.token || '');

    if (!/^[a-f0-9]{64}$/.test(token)) {
      return res.status(400).send('Invalid login token');
    }

    const login = await db.consumeTelegramLoginToken(token);

    if (!login) {
      return res
        .status(401)
        .send('Login link expired or already used. Start again on Giftly.');
    }

    const user = await db.upsertUser({
      id: login.telegram_id,
      first_name: login.first_name,
      last_name: login.last_name,
      username: login.username,
      photo_url: login.photo_url,
      auth_date: login.auth_date,
      hash: null
    });

    // Обновляем сессию только после подтверждения ботом.
    await new Promise((resolve, reject) => {
      req.session.regenerate((error) => {
        if (error) return reject(error);

        req.session.telegramUser = user;
        req.session.save((saveError) => {
          if (saveError) return reject(saveError);
          resolve();
        });
      });
    });

    return res.redirect('/');
  } catch (error) {
    console.error('Telegram login completion error:', error);

    return res.status(500).send('Could not complete Telegram login');
  }
};