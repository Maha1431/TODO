const express = require('express');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../Controllers/taskcontroller');
const authMiddleware = require('../Middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getTasks);
router.post('/', authMiddleware, createTask);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
