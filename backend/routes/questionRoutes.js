const express = require('express');
const router = express.Router();
const { addQuestionsToSurvey } = require('../controllers/questionController');

router.put('/:id/questions', addQuestionsToSurvey);

module.exports = router;