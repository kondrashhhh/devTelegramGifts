const crypto = require('crypto');

function validateTelegramAuth(botToken) {
  return async (req, res, next) => {
    try {
      const authData = req.body;
      
      if (!authData || !authData.id || !authData.auth_date) {
        return res.status(400).json({ 
          success: false,
          error: 'Missing required fields' 
        });
      }

      if (authData.hash) {
        const dataToCheck = [];
        for (const [key, value] of Object.entries(authData)) {
          if (key !== 'hash') {
            dataToCheck.push(`${key}=${value}`);
          }
        }
        
        dataToCheck.sort();
        const dataString = dataToCheck.join('\n');
        
        const secretKey = crypto.createHash('sha256')
          .update(botToken)
          .digest();
        
        const hmac = crypto.createHmac('sha256', secretKey)
          .update(dataString)
          .digest('hex');
        
        if (hmac !== authData.hash) {
          return res.status(401).json({ 
            success: false,
            error: 'Invalid Telegram auth hash' 
          });
        }
      }

      const authDate = parseInt(authData.auth_date, 10);
      if (Date.now() / 1000 - authDate > 86400) {
        return res.status(401).json({ 
          success: false,
          error: 'Auth data expired' 
        });
      }
      
      req.telegramUser = {
        id: authData.id,
        first_name: authData.first_name || '',
        last_name: authData.last_name || '',
        username: authData.username || '',
        photo_url: authData.photo_url || '',
        auth_date: authData.auth_date,
        hash: authData.hash || null
      };
      
      next();
    } catch (error) {
      console.error('Auth validation error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
      });
    }
  };
}

module.exports = {
  validateTelegramAuth
};