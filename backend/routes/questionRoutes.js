const express = require('express');
const router = express.Router();
const { addQuestionsToSurvey } = require('../controllers/questionController');

// Mount as /api/surveys/:id/questions
router.post('/:id/questions', addQuestionsToSurvey);

module.exports = router;