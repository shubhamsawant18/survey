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