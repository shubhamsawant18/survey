import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const BASE_URL = process.env.REACT_APP_API_URL;

const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app-background">
      <Navbar />
      <div className="main-container">
        <TaskForm refreshTasks={fetchTasks} />
        <TaskList tasks={tasks} refreshTasks={fetchTasks} />
      </div>
    </div>
  );
};

export default App;
