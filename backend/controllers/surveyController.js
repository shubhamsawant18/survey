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

exports.updateParticipants = async (req, res) => {
  try {
    const { id } = req.params;
    const survey = await Survey.findByIdAndUpdate(
      id,
      { participants: req.body.participants },
      { new: true }
    );
    res.json(survey);
  } catch (error) {
    res.status(500).json({ error: "Failed to update participants" });
  }
};