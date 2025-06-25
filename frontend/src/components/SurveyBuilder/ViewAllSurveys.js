import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewAllSurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
const response = await axios.get('http://localhost:5000/api/surveys');        
setSurveys(response.data);
      } catch (err) {
        setError('Failed to fetch surveys');
        console.error(err);
      }
    };

    fetchSurveys();
  }, []);

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="view-surveys">
      <h2>All Surveys</h2>
      {surveys.length === 0 ? (
        <p>No surveys available.</p>
      ) : (
        <ul>
          {surveys.map((survey) => (
            <li key={survey._id} className="survey-item">
              <h3>{survey.title || 'Untitled Survey'}</h3>
              <p>
                <strong>Participants:</strong>{' '}
                {Array.isArray(survey.participants)
                  ? survey.participants.join(', ')
                  : '—'}
              </p>
              <p>
                <strong>Description:</strong>{' '}
                {survey.description || 'No description provided'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewAllSurveys;