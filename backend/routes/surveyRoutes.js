const express = require('express');
const router = express.Router();
const { createSurvey, updateParticipants } = require('../controllers/surveyController');

router.post('/', createSurvey);
router.put('/:id/participants', updateParticipants);

module.exports = router;