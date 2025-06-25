import { useState } from 'react';
import axios from 'axios';
import '../styles/createSurvey.css';
const CreateSurvey = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { text: '', type: 'single-select', options: [''] }
  ]);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push('');
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { text: '', type: 'single-select', options: [''] }]);
  };

  const removeQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Create survey
      const { data: survey } = await axios.post('http://localhost:5000/api/surveys', {
        title
      });

      // Step 2: Add questions
      await axios.post(`http://localhost:5000/api/surveys/${survey._id}/questions`, {
        questions
      });

      alert('Survey created successfully');
      setTitle('');
      setQuestions([{ text: '', type: 'single-select', options: [''] }]);
    } catch (err) {
      console.error('Error creating survey:', err);
      alert('Survey creation failed');
    }
  };

  return (
    <div className="create-survey">
      <h2>Create a New Survey</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Survey Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {questions.map((q, index) => (
          <div key={index} className="question-block">
            <input
              type="text"
              placeholder={`Question ${index + 1}`}
              value={q.text}
              onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
              required
            />

            <select
              value={q.type}
              onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
            >
              <option value="single-select">Single Select</option>
              <option value="multi-select">Multi Select</option>
            </select>

            {q.options.map((opt, oIndex) => (
              <input
                key={oIndex}
                type="text"
                placeholder={`Option ${oIndex + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(index, oIndex, e.target.value)}
                required
              />
            ))}

            <button type="button" onClick={() => addOption(index)}>
              + Add Option
            </button>

            <button type="button" onClick={() => removeQuestion(index)}>
              🗑️ Remove Question
            </button>
          </div>
        ))}

        <button type="button" onClick={addQuestion}>
          ➕ Add New Question
        </button>

        <button type="submit" className="submit-survey">
          🚀 Create Survey
        </button>
      </form>
    </div>
  );
};

export default CreateSurvey;