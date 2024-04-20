import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TODO.css'; // Import CSS file for styling

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [filterStatus, setFilterStatus] = useState('');
  const [editTaskId, setEditTaskId] = useState(null); // Track the task ID being edited

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks/get');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const createTask = async () => {
    try {
      await axios.post('http://localhost:5000/tasks/add', { title, description, status });
      fetchTasks(); // Refresh tasks after creating a new one
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      await axios.put(`http://localhost:5000/tasks/update/${id}`, updatedTask);
      fetchTasks(); // Refresh tasks after updating
      setEditTaskId(null); // Reset edit mode after updating
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      fetchTasks(); // Refresh tasks after deleting
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleUpdateClick = (id) => {
    setEditTaskId(id); // Set the task ID being edited
  };

  const handleCancelClick = () => {
    setEditTaskId(null); // Cancel editing, reset edit mode
  };

  const filteredTasks = filterStatus ? tasks.filter(task => task.status === filterStatus) : tasks;

  return (
    <div className="container">
      <h1>Task Management App</h1>

      <div className="create-task">
        <h2>Create New Task</h2>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" /><br />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" /><br />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select><br />
        <button onClick={createTask}>Create Task</button>
      </div>

      <div className="filter-tasks">
        <h2>Filter Tasks</h2>
        <select value={filterStatus} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div className="all-tasks">
        <h2>All Tasks</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map(task => (
              <tr key={task._id}>
                <td>{editTaskId === task._id ? <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /> : task.title}</td>
                <td>{editTaskId === task._id ? <textarea value={description} onChange={(e) => setDescription(e.target.value)} /> : task.description}</td>
                <td>{editTaskId === task._id ? <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select> : task.status}</td>
                <td>
                  {editTaskId === task._id ? (
                    <>
                      <button onClick={() => updateTask(task._id, { title, description, status })}>Save</button>
                      <button onClick={handleCancelClick}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleUpdateClick(task._id)}>Update</button>
                  )}
                  <button onClick={() => deleteTask(task._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TodoApp;