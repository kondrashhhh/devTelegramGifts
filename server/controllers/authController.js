exports.authorization = (req, res) => {
    try {
      req.session.telegramUser = req.telegramUser;
      res.json({
        success: true,
        user: req.telegramUser
      });
    } catch (error) {
      console.error('Auth endpoint error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
      });
    }
}