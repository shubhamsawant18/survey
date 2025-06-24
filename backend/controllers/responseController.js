const Response = require('../models/Response');

// ✅ Step 7: Submit Response
exports.submitResponse = async (req, res) => {
  try {
    const { id: surveyId } = req.params;
    const { responses, userId } = req.body;

    const formatted = responses.map(r => ({
      question: r.questionId,
      answer: r.answer
    }));

    const newResponse = new Response({
      survey: surveyId,
      userId,
      answers: formatted
    });

    await newResponse.save();
    res.status(201).json({ message: "Response recorded!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit response" });
  }
};

// ✅ Step 8: Get All Raw Responses for a Survey
exports.getResponsesBySurvey = async (req, res) => {
  try {
    const { id: surveyId } = req.params;

    const responses = await Response.find({ survey: surveyId })
      .populate('answers.question')
      .sort({ submittedAt: -1 });

    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch responses" });
  }
};

// ✅ Step 9: Aggregate Responses by Question
exports.getSurveyResults = async (req, res) => {
  try {
    const { id: surveyId } = req.params;

    const responses = await Response.find({ survey: surveyId })
      .populate('answers.question');

    const summary = {};

    for (const response of responses) {
      for (const { question, answer } of response.answers) {
        const qid = question._id.toString();

        if (!summary[qid]) {
          summary[qid] = {
            question: question.text,
            type: question.type,
            counts: {}
          };
        }

        if (Array.isArray(answer)) {
          for (const opt of answer) {
            summary[qid].counts[opt] = (summary[qid].counts[opt] || 0) + 1;
          }
        } else {
          summary[qid].counts[answer] = (summary[qid].counts[answer] || 0) + 1;
        }
      }
    }

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate survey results" });
  }
};