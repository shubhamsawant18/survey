const Question = require('../models/Question');
const Survey = require('../models/Survey');

exports.addQuestionsToSurvey = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Array.isArray(req.body.questions) || req.body.questions.length === 0) {
      return res.status(400).json({ error: "No questions provided" });
    }

    const enrichedQuestions = req.body.questions.map(q => ({
      ...q,
      surveyId: id
    }));

    const questions = await Question.insertMany(enrichedQuestions);
    const questionIds = questions.map(q => q._id);

    const survey = await Survey.findByIdAndUpdate(
      id,
      { $push: { questions: { $each: questionIds } } },
      { new: true }
    );

    res.status(201).json(survey);
  } catch (error) {
    console.error('❌ Error in addQuestionsToSurvey:', error);
    res.status(500).json({ error: "Failed to add questions" });
  }
};