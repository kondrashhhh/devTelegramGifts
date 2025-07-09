const crypto = require('crypto');

function validateTelegramAuth(botToken) {
  return async (req, res, next) => {
    try {
      const authData = req.body;
      
      // 1. Проверка наличия обязательных полей
      if (!authData || !authData.hash) {
        return res.status(400).json({ error: 'Invalid auth data' });
      }

      // 2. Подготовка данных для проверки
      const dataToCheck = [];
      for (const [key, value] of Object.entries(authData)) {
        if (key !== 'hash') {
          dataToCheck.push(`${key}=${value}`);
        }
      }
      
      // 3. Сортировка и объединение
      dataToCheck.sort();
      const dataString = dataToCheck.join('\n');
      
      // 4. Создание секретного ключа
      const secretKey = crypto.createHash('sha256')
        .update(botToken)
        .digest();
      
      // 5. Создание HMAC
      const hmac = crypto.createHmac('sha256', secretKey)
        .update(dataString)
        .digest('hex');
      
      // 6. Сравнение HMAC
      if (hmac !== authData.hash) {
        return res.status(401).json({ error: 'Invalid Telegram auth hash' });
      }
      
      // 7. Проверка времени (не старше 1 дня)
      const authDate = parseInt(authData.auth_date, 10);
      if (Date.now() / 1000 - authDate > 86400) {
        return res.status(401).json({ error: 'Auth data expired' });
      }
      
      // 8. Добавляем пользователя в запрос
      req.telegramUser = {
        id: authData.id,
        first_name: authData.first_name,
        last_name: authData.last_name || '',
        username: authData.username || '',
        photo_url: authData.photo_url || '',
        auth_date: authData.auth_date
      };
      
      next();
    } catch (error) {
      console.error('Auth validation error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

module.exports = {
  validateTelegramAuth
};