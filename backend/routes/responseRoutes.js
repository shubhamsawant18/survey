const express = require('express');
const router = express.Router();
const {
  submitResponse,
  getResponsesBySurvey,
  getSurveyResults
} = require('../controllers/responseController');

// Submit answers to a survey
router.post('/:id/responses', submitResponse);

// Get raw responses (admin or analytics view)
router.get('/:id/responses', getResponsesBySurvey);

// Get summarized result counts for each question
router.get('/:id/results', getSurveyResults);

module.exports = router;