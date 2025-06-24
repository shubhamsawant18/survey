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
const taskRoutes = require('./routes/taskRoutes');         // (optional) To-Do tasks
const surveyRoutes = require('./routes/surveyRoutes');     // Survey creation, config, publishing
const questionRoutes = require('./routes/questionRoutes'); // Survey questions
const responseRoutes = require('./routes/responseRoutes'); // User submissions + analytics

// Mount routes
app.use('/api/tasks', taskRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/surveys', questionRoutes);   // questions are scoped under a survey
app.use('/api/surveys', responseRoutes);   // responses & analytics also scoped under surveys

// Health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});