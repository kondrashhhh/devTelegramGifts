const express = require("express");
const casesController = require("../controllers/casesController.js");
const casesRouter = express.Router();

casesRouter.get('/', casesController.getCases);
casesRouter.get('/:category/:translit_name', casesController.getCase)
casesRouter.post('/:category/:translit_name/open', casesController.caseOpen)

module.exports = casesRouter;