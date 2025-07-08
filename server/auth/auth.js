const crypto = require('crypto');

module.exports = {
  validateTelegramAuth: (botToken) => (req, res, next) => {
    try {
      const authData = req.body;
      const hash = authData.hash;
      
      const dataToCheck = {...authData};
      delete dataToCheck.hash;
      
      const secret = crypto.createHash('sha256')
        .update(botToken)
        .digest();
        
      const checkString = Object.keys(dataToCheck)
        .sort()
        .map(k => `${k}=${dataToCheck[k]}`)
        .join('\n');
        
      // Создаем хеш для проверки
      const checkHash = crypto.createHmac('sha256', secret)
        .update(checkString)
        .digest('hex');
        
      if (hash !== checkHash) {
        return res.status(401).json({ error: 'Invalid Telegram authentication' });
      }

      req.telegramUser = {
        id: authData.id,
        firstName: authData.first_name,
        lastName: authData.last_name || '',
        username: authData.username,
        photoUrl: authData.photo_url || null,
        authDate: new Date(authData.auth_date * 1000)
      };

      next();
    } catch (error) {
      console.error('Auth validation error:', error);
      res.status(500).json({ error: 'Authentication failed' });
    }
  },

  getTelegramUserData: (req) => {
    return req.telegramUser;
  }
};