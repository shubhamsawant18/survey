import { useState } from 'react';
import Questions from './Questions';
import Participants from './Participants';
import Schedule from './Schedule';
import Review from './Review';
import '../../styles/builderNav.css';
import axios from 'axios';

const SurveyBuilderContainer = () => {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [schedule, setSchedule] = useState({
    start: '',
    duration: '',
    reminder: ''
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handlePublish = async () => {
    try {
      const { data: survey } = await axios.post('http://localhost:5000/api/surveys', { title });
      await axios.post(`http://localhost:5000/api/surveys/${survey._id}/questions`, { questions });
      await axios.put(`http://localhost:5000/api/surveys/${survey._id}/publish`);
      await axios.put(`http://localhost:5000/api/surveys/${survey._id}/participants`, {
  participants
});
      alert('🎉 Survey published successfully!');
    } catch (err) {
      console.error('Publishing error:', err);
      alert('Failed to publish survey.');
    }
  };

  const steps = [
    <Questions title={title} setTitle={setTitle} questions={questions} setQuestions={setQuestions} />,
    <Participants participants={participants} setParticipants={setParticipants} />,
    <Schedule schedule={schedule} setSchedule={setSchedule} />,
    <Review
      surveyData={{ title, questions, participants, schedule }}
      onPublish={handlePublish}
    />
  ];

  return (
    <div className="builder-wrapper">
      <div className="step-tabs">
        {['Questions', 'Participants', 'Schedule', 'Review'].map((label, i) => (
          <div key={i} className={`tab ${step === i ? 'active' : ''}`}>
            {i + 1}. {label}
          </div>
        ))}
      </div>

      <div className="step-body">{steps[step]}</div>

      <div className="step-nav">
        {step > 0 && <button onClick={prevStep}>← Back</button>}
        {step < 3 && <button onClick={nextStep} disabled={!title}>Next →</button>}
      </div>
    </div>
  );
};

export default SurveyBuilderContainer;