console.log("backend started");

const express = require('express');
const mongoose = require('mongoose');
const tasksRouter = require('./Routes/TaskRoutes');
const userRouter = require('./Routes/userRoutes');
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());
app.options("*", cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Use the tasks router for all routes related to tasks
app.use('/api/tasks', tasksRouter); // Fixed the route prefix

app.use('/api/auth', userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
