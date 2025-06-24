const Question = require('../models/Question');
const Survey = require('../models/Survey');

exports.addQuestionsToSurvey = async (req, res) => {
  try {
    const { id } = req.params;
    const questions = await Question.insertMany(req.body.questions);
    const questionIds = questions.map(q => q._id);
    const survey = await Survey.findByIdAndUpdate(id, {
      $push: { questions: { $each: questionIds } }
    }, { new: true });
    res.json(survey);
  } catch (error) {
    res.status(500).json({ error: "Failed to add questions" });
  }
};