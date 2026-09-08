const categoryData = require("../cases/cases.json");
const caseData = require("../cases/casesData.json");
const { findCase } = require("../utils/findCase");
const db = require("../db");

exports.getCases = (req, res) => {
  try {
    res.json(categoryData);
  } catch (error) {
    console.error('Cases error:', error);
    res.status(500).json({ error: 'Failed to load cases' });
  }
}

exports.getCase = (req, res) => {
  const result = findCase(caseData, req);
  
  if (result.error) {
    return res.status(result.status || 500).json({ 
      error: result.error,
      details: result.details
    });
  }

  return res.json(result.case);
};

exports.caseOpen = async (req, res) => {
  const box = findCase(caseData, req);
  const count = Number(req.body.count || 1);
  const cost = Number(req.body.cost || 0);
  const telegramId = Number(req.body.telegram_id);

  if (box.error) {
    return res.status(box.status || 404).json({ error: box.error });
  }

  try {
    const balanceRow = await db.get(
      'SELECT balance FROM user_profiles WHERE telegram_id = ?',
      [telegramId]
    );
    const balance = Number(balanceRow?.balance ?? 0);

    if (balance < cost) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    const updatedBalance = balance - cost;
    await db.run(
      'UPDATE user_profiles SET balance = ?, updated_at = CURRENT_TIMESTAMP WHERE telegram_id = ?',
      [updatedBalance, telegramId]
    );

    if (count > 1) {
      const resultArray = [];
      for (let i = 0; i < count; i++) {
        resultArray.push(box.case.open());
      }
      return res.json({ items: resultArray, balance: updatedBalance });
    }

    const result = box.case.open();
    return res.json({ items: { ...result, win: true }, balance: updatedBalance });
  } catch (error) {
    console.error('Case opening error:', error);
    return res.status(500).json({ error: 'Failed to open case' });
  }
};