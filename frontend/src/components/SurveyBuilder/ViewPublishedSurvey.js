import { useState } from 'react';
import axios from 'axios';
import '../styles/ViewPublishedSurvey.css';
const ViewPublishedSurvey = () => {
  const [survey, setSurvey] = useState(null);

  const fetchSurvey = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/surveys');
      const latest = data[data.length - 1]; // get last published
      setSurvey(latest);
    } catch (err) {
      console.error('Error fetching survey:', err);
    }
  };

  return (
    <div className="view-survey-block">
      <button onClick={fetchSurvey}>📄 View Latest Survey Summary</button>

      {survey && (
        <div className="survey-display">
          <h2>{survey.title}</h2>
          <h4>Participants: {survey.participants.join(', ')}</h4>

          <ul>
            {survey.questions.map((q, idx) => (
              <li key={q._id || idx}>
                {idx + 1}. {q.text} ({q.type}) {q.isRequired && '✅'}
              </li>
            ))}
          </ul>

          <p>Start: {survey.scheduling?.start}</p>
          <p>Duration: {survey.scheduling?.duration} hrs</p>
          <p>Reminders: Every {survey.scheduling?.reminder} hrs</p>
        </div>
      )}
    </div>
  );
};

export default ViewPublishedSurvey;