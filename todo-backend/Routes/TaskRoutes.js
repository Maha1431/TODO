// routes/tasks.js
const express = require('express');
const router = express.Router();
const taskController = require('../Controllers/taskcontroller');

// Get all tasks
router.get('/get', taskController.getAllTasks);

// Get a single task by ID
router.get('/:id', taskController.getTaskById);

// Create a new task
router.post('/add', taskController.createTask);

// Update a task
router.put('/update/:id', taskController.updateTask);

// Delete a task
router.delete('/:id', taskController.deleteTask);

module.exports = router;
