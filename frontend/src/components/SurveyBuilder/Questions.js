import { useState } from 'react';
import '../../styles/questions.css';

const Questions = ({ title, setTitle, questions, setQuestions }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const addQuestion = (type) => {
  const newQ = {
    id: Date.now(),
    text: '',
    type, // ← THIS value needs to match the Mongoose enum
    options: [],
    required: true
  };
  setQuestions([...questions, newQ]);
};
  const updateQuestion = (field, value) => {
    const updated = [...questions];
    updated[selectedIndex][field] = value;
    setQuestions(updated);
  };

  const updateOption = (optIdx, value) => {
    const updated = [...questions];
    updated[selectedIndex].options[optIdx] = value;
    setQuestions(updated);
  };

  const addOption = () => {
    const updated = [...questions];
    updated[selectedIndex].options.push('');
    setQuestions(updated);
  };

  const renderEditor = () => {
    if (selectedIndex === null || !questions[selectedIndex]) return <p>Select a question to edit</p>;
    const q = questions[selectedIndex];

    return (
      <div className="editor-panel">
        <h3>Edit: {q.type.replace('-', ' ').toUpperCase()}</h3>
        <input
          type="text"
          value={q.text}
          onChange={(e) => updateQuestion('text', e.target.value)}
          placeholder="Enter question text"
        />

        {(q.type === 'single-select' || q.type === 'multi-select') && (
          <div className="options-block">
            <p>Options:</p>
            {q.options.map((opt, i) => (
              <input
                key={i}
                type="text"
                value={opt}
                placeholder={`Option ${i + 1}`}
                onChange={(e) => updateOption(i, e.target.value)}
              />
            ))}
            <button onClick={addOption}>➕ Add Option</button>
          </div>
        )}

        {q.type === 'yesno' && (
          <div className="options-block">
            <p>Answers:</p>
            <label><input type="radio" disabled /> Yes</label>
            <label><input type="radio" disabled /> No</label>
          </div>
        )}

        <label className="toggle">
          <input
            type="checkbox"
            checked={q.required}
            onChange={(e) => updateQuestion('required', e.target.checked)}
          />
          Required
        </label>
      </div>
    );
  };

  return (
    <div className="builder-layout">
      <div className="left-panel">
        <h3>Survey Title</h3>
        <input
          type="text"
          value={title}
          placeholder="Enter survey title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <hr />
        <h4>Added Questions</h4>
        {questions.map((q, i) => (
          <div
            key={q.id}
            className={`question-item ${selectedIndex === i ? 'selected' : ''}`}
            onClick={() => setSelectedIndex(i)}
          >
            <strong>{q.type.replace('-', ' ')}</strong>
            <p>{q.text || 'Untitled'}</p>
            {q.required && <span className="required-tag">Required</span>}
          </div>
        ))}
        <hr />
        <h4>Add Question</h4>
        <div className="question-types">
          {['text', 'single-select', 'multi-select', 'yesno', 'mood'].map((type) => (
            <button key={type} onClick={() => addQuestion(type)}>
              ➕ {type.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="right-panel">
        {renderEditor()}
      </div>
    </div>
  );
};

export default Questions;