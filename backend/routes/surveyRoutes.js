const express = require('express');
const router = express.Router();
const { createSurvey } = require('../controllers/surveyController');

router.post('/', createSurvey); // This line is critical

module.exports = router;