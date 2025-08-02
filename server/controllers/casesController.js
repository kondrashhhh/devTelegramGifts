const categoryData = require("../cases/cases.json");
const caseData = require("../cases/casesData.json");
const { findCase } = require("../utils/findCase");

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

  res.json(result.case);
};

exports.caseOpen = (req, res) => {
  const box = findCase(caseData, req);
  const result = box.case.open()
  res.json({ ...result, "win": true });
};