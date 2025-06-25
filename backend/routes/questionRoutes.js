const express = require('express');
const router = express.Router();
const { addQuestionsToSurvey } = require('../controllers/questionController');

// Attach questions to a survey
router.post('/:id/questions', addQuestionsToSurvey);

module.exports = router;