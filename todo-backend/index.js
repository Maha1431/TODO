console.log("backend start");

// index.js
const express = require('express');
const mongoose = require('mongoose');
const tasksRouter = require('./Routes/TaskRoutes');
const compression = require("compression");
const cors = require("cors");


const app = express();
app.use(express.json());


// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taskManger', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Use the tasks router for all routes related to tasks
app.use('/tasks', tasksRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
