import { useState } from 'react';
import axios from 'axios';
import '../styles/TaskForm.css';

const BASE_URL = process.env.REACT_APP_API_URL;

const TaskForm = ({ refreshTasks }) => {
  const [task, setTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    try {
      await axios.post(`${BASE_URL}/api/tasks`, { title: task });
      setTask('');
      refreshTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="What do you need to do?"
      />
      <button type="submit">➕ Add Task</button>
    </form>
  );
};

export default TaskForm;
