const Survey = require('../models/Survey');
const Question = require('../models/Question');

// Create new survey
exports.createSurvey = async (req, res) => {
  try {
    const { title } = req.body;
    const survey = new Survey({ title });
    await survey.save();
    res.status(201).json(survey);
  } catch (error) {
    res.status(500).json({ error: 'Survey creation failed' });
  }
};

// Add questions to a survey
exports.addQuestions = async (req, res) => {
  try {
    const { questions } = req.body;
    const surveyId = req.params.id;

    const created = await Promise.all(
      questions.map((q) =>
        new Question({
          text: q.text,
          type: q.type,
          isRequired: q.required,
          options: q.options || [],
          surveyId
        }).save()
      )
    );

    res.status(201).json({ message: 'Questions added', questions: created });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add questions' });
  }
};

// Update participants (team toggles)
exports.updateParticipants = async (req, res) => {
  try {
    const survey = await Survey.findByIdAndUpdate(
      req.params.id,
      { participants: req.body.participants },
      { new: true }
    );
    res.status(200).json(survey);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update participants' });
  }
};

// Update scheduling info
exports.updateScheduling = async (req, res) => {
  try {
    const survey = await Survey.findByIdAndUpdate(
      req.params.id,
      { scheduling: req.body.scheduling },
      { new: true }
    );
    res.json(survey);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update scheduling' });
  }
};

// Publish survey
exports.publishSurvey = async (req, res) => {
  try {
    const survey = await Survey.findByIdAndUpdate(
      req.params.id,
      { isPublished: true },
      { new: true }
    );
    res.json(survey);
  } catch (error) {
    res.status(500).json({ error: 'Failed to publish survey' });
  }
};

// Fetch survey by ID
exports.getSurveyById = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id).populate('questions');
    res.json(survey);
  } catch (error) {
    res.status(404).json({ error: 'Survey not found' });
  }
};

// Get all published surveys
exports.getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find({ isPublished: true });
    res.json(surveys);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch surveys' });
  }
};