const express = require('express');
const router = express.Router();
const {
  createSurvey,
  updateParticipants,
  updateScheduling,
  publishSurvey,
  getSurveyById,
  getAllSurveys
} = require('../controllers/surveyController');

// Survey operations
router.post('/', createSurvey);
router.put('/:id/participants', updateParticipants);
router.put('/:id/scheduling', updateScheduling);
router.put('/:id/publish', publishSurvey);
router.get('/:id', getSurveyById);
router.get('/', getAllSurveys);

module.exports = router;