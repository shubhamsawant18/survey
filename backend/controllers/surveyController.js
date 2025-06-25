const Survey = require('../models/Survey');

exports.createSurvey = async (req, res) => {
  try {
    const { title } = req.body;
    const survey = new Survey({ title });
    await survey.save();
    res.status(201).json(survey);
  } catch (error) {
    res.status(500).json({ error: "Survey creation failed" });
  }
};

const Survey = require('../models/surveyModel');

exports.updateParticipants = async (req, res) => {
  try {
    const surveyId = req.params.id;
    const { participants } = req.body;

    const survey = await Survey.findByIdAndUpdate(
      surveyId,
      { participants },
      { new: true }
    );

    res.status(200).json(survey);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update participants', error: err.message });
  }
};
exports.updateScheduling = async (req, res) => {
  try {
    const { id } = req.params;
    const survey = await Survey.findByIdAndUpdate(
      id,
      { scheduling: req.body.scheduling },
      { new: true }
    );
    res.json(survey);
  } catch (error) {
    res.status(500).json({ error: "Failed to update scheduling" });
  }
};
exports.publishSurvey = async (req, res) => {
  try {
    const { id } = req.params;
    const survey = await Survey.findByIdAndUpdate(
      id,
      { isPublished: true },
      { new: true }
    );
    res.json(survey);
  } catch (error) {
    res.status(500).json({ error: "Failed to publish survey" });
  }
};
exports.getSurveyById = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id).populate("questions");
    res.json(survey);
  } catch (error) {
    res.status(404).json({ error: "Survey not found" });
  }
};
exports.getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find({ isPublished: true }); // only published
    res.json(surveys);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch surveys" });
  }
};