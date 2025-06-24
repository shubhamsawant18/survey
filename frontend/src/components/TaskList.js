import { useState } from 'react';
import axios from 'axios';
import '../styles/TaskList.css';

const BASE_URL = process.env.REACT_APP_API_URL;

const TaskList = ({ tasks, refreshTasks }) => {
  const [editTaskId, setEditTaskId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');

  const startEditing = (task) => {
    setEditTaskId(task._id);
    setUpdatedTitle(task.title);
  };

  const saveUpdatedTask = async (taskId) => {
    try {
      await axios.put(`${BASE_URL}/api/tasks/${taskId}`, { title: updatedTitle });
      setEditTaskId(null);
      refreshTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const toggleComplete = async (task) => {
    try {
      await axios.put(`${BASE_URL}/api/tasks/${task._id}`, {
        title: task.title,
        completed: !task.completed,
      });
      refreshTasks();
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/tasks/${id}`);
      refreshTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="no-tasks">🎉 No tasks available. Add a new task!</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className={`task-card ${task.completed ? 'completed' : ''}`}>
            {editTaskId === task._id ? (
              <>
                <input
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <button onClick={() => saveUpdatedTask(task._id)}>💾 Save</button>
              </>
            ) : (
              <>
                <span className="task-title">{task.title}</span>
                <div className="task-actions">
                  <button onClick={() => startEditing(task)}>✏️ Edit</button>
                  <button onClick={() => toggleComplete(task)}>Toggle</button>
                  <button onClick={() => deleteTask(task._id)}>🗑 Delete</button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
