// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    required: true
  }
});

module.exports = mongoose.model('Task', taskSchema);
