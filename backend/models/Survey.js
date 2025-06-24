const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
  title: { type: String, required: true },
  isPublished: { type: Boolean, default: false },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  participants: {
    frontend: Boolean,
    backend: Boolean,
    devops: Boolean,
    mobile: Boolean
  },
  scheduling: {
    startDate: Date,
    durationHours: Number,
    timezone: String,
    recurrence: { type: String, enum: ["one-time", "weekly", "monthly"] },
    reminderIntervalHours: Number
  }
}, { timestamps: true });

module.exports = mongoose.model("Survey", SurveySchema);