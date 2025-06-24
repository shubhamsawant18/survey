const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Route imports
const taskRoutes = require('./routes/taskRoutes'); // Your To-Do feature
const surveyRoutes = require('./routes/surveyRoutes'); // Survey config (title, scheduling, etc)
const questionRoutes = require('./routes/questionRoutes'); // Handles adding questions to surveys

// Route mounting
app.use('/api/tasks', taskRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/surveys', questionRoutes); // Still under /api/surveys since questions are scoped to surveys

// Health check route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});