const Case = require("../models/Case/Case");

function findCase(caseData, req) {
  try {
    const categoryParam = req.params.category.toLowerCase();
    const translitNameParam = req.params.translit_name.toLowerCase();

    const foundCase = caseData.find(caseItem => 
      caseItem.translit_name.toLowerCase() === translitNameParam
    );

    if (!foundCase) {
      return { 
        error: 'Case not found',
        status: 404,
        details: `Case with translit_name ${translitNameParam} not found`
      };
    }

    if (foundCase.category.category_id.toLowerCase() !== categoryParam) {
      return {
        error: 'Case not found in specified category',
        status: 404,
        details: `Case ${translitNameParam} not found in category ${categoryParam}`
      };
    }

    const caseInstance = new Case(foundCase);

    return {
      case: caseInstance,
      status: 200
    };

  } catch (error) {
    console.error('Case processing error:', error);
    return {
      error: 'Failed to process case',
      status: 500,
      details: error.message
    };
  }
}

module.exports = {
  findCase
};