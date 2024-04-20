// controllers/taskController.js
const taskService = require('../Services/taskService');
const Joi = require('joi');
const taskSchema = require('../Models/taskModel');

// Get all tasks
async function getAllTasks(req, res) {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get a single task by ID
async function getTaskById(req, res) {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Create a new task
async function createTask(req, res) {
  try {
    const { error } = taskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const task = await taskService.createTask(req.body);
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update a task
async function updateTask(req, res) {
    try {
      const Id = req.params.id; // Assuming the user ID is passed as a route parameter
      const taskData = req.body;
      const updatedTask = await taskService.updateTask(Id, taskData);
      res.json(updatedTask);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
// Delete a task
async function deleteTask(req, res) {
  try {
    const Id = req.params.id; // Assuming the user ID is passed as a route parameter
      await taskService.deleteTask(Id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
