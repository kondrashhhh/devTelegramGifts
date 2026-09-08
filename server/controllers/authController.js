const db = require('../db');
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