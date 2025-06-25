import React from 'react';
import '../../styles/review.css';

const Review = ({ surveyData, onPublish }) => {
  const { title, questions, participants, schedule } = surveyData;

  const required = questions.filter((q) => q.required).length;
  const optional = questions.length - required;

  return (
    <div className="review-container">
      <h2>📦 Review & Publish</h2>

      <div className="summary-block">
        <h3>📋 Questions</h3>
        <p>Total: {questions.length}</p>
        <p>Required: {required}</p>
        <p>Optional: {optional}</p>
        <ul>
          {questions.map((q, i) => (
            <li key={i}>
              {i + 1}. {q.text || 'Untitled'} ({q.type}) {q.required ? '✅' : ''}
            </li>
          ))}
        </ul>
      </div>

      <div className="summary-block">
        <h3>👥 Participants</h3>
        <p>Teams selected: {participants.length > 0 ? participants.join(', ') : 'None'}</p>
      </div>

      <div className="summary-block">
        <h3>🗓️ Schedule</h3>
        <p>Start: <strong>{schedule.start || '--'}</strong></p>
        <p>Duration: <strong>{schedule.duration || '--'} hrs</strong></p>
        <p>Reminders every: <strong>{schedule.reminder || '--'} hrs</strong></p>
      </div>

      <button className="publish-btn" onClick={onPublish}>
        🚀 Publish Survey
      </button>
    </div>
  );
};

export default Review;