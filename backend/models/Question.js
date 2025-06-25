const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: {
    type: String,
    enum: ['text', 'single-select', 'multi-select', 'yes-no', 'mood'],
    required: true
  },
  isRequired: { type: Boolean, default: false },
  options: [String],
  surveyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true }
});

module.exports = mongoose.model('Question', QuestionSchema);