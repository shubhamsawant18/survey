const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  answer: mongoose.Schema.Types.Mixed  // Can be String, Boolean, or Array
});

const ResponseSchema = new mongoose.Schema({
  survey: { type: mongoose.Schema.Types.ObjectId, ref: "Survey" },
  userId: String,  // Optional, for tracking users
  answers: [AnswerSchema],
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Response", ResponseSchema);