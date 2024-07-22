import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import SearchBar from "./SearchBar";
import TaskColumn from "./TaskColumn";
import './taskform.css'; // Import the updated CSS file

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [taskColumns, setTaskColumns] = useState({
    TODO: [],
    IN_PROGRESS: [],
    DONE: []
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const userData = localStorage.getItem('userData');
  const parsedUserData = JSON.parse(userData);
  const token = parsedUserData.token;

  const fetchTasks = async () => {
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.get("https://task-management-5fa0.onrender.com/api/tasks/", {
        headers: {
          Authorization: `${token}`
        }
      });

      const initialTasks = response.data;

      // Initialize tasks in the TODO column initially
      setTaskColumns({
        TODO: initialTasks,
        IN_PROGRESS: [],
        DONE: []
      });

      setTasks(initialTasks); // For search and sort functionality
    } catch (error) {
      console.error("Error fetching tasks:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (task) => {
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      await axios.post("https://task-management-5fa0.onrender.com/api/tasks/", {
        ...task,
        userId: parsedUserData.userId
      }, {
        headers: {
          Authorization: `${token}`
        }
      });
      setShowForm(false);
      await fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error.response ? error.response.data : error.message);
    }
  };

  const handleEditTask = async (task) => {
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      await axios.put(`https://task-management-5fa0.onrender.com/api/tasks/${editingTask._id}`, task, {
        headers: {
          Authorization: `${token}`
        }
      });
      setEditingTask(null);
      await fetchTasks();
    } catch (error) {
      console.error("Error editing task:", error.response ? error.response.data : error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      await axios.delete(`https://task-management-5fa0.onrender.com/api/tasks/${taskId}`, {
        headers: {
          Authorization: `${token}`
        }
      });
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error.response ? error.response.data : error.message);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (option) => {
    setSortOption(option);
  };

  const filteredTasks = tasks
    .filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === "24h") {
        return new Date(b.date) - new Date(a.date) > 24 * 60 * 60 * 1000 ? 1 : -1;
      } else if (sortOption === "1w") {
        return new Date(b.date) - new Date(a.date) > 7 * 24 * 60 * 60 * 1000 ? 1 : -1;
      } else if (sortOption === "recent") {
        return new Date(b.date) - new Date(a.date);
      }
      return 0;
    });

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("text/plain", taskId);
  };

  const handleDrop = (e, newColumn) => {
    e.preventDefault();
    
    const validColumns = ["TODO", "IN_PROGRESS", "DONE"];
    if (!validColumns.includes(newColumn)) return;
    
    const taskId = e.dataTransfer.getData("text/plain");
    if (!taskId) return;

    setTaskColumns(prevTaskColumns => {
      const task = Object.values(prevTaskColumns).flat().find(task => task._id === taskId);
      if (!task) return prevTaskColumns; // Ensure task is found

      const updatedColumns = { ...prevTaskColumns };

      // Remove task from the original column
      for (const column in updatedColumns) {
        updatedColumns[column] = updatedColumns[column].filter(task => task._id !== taskId);
      }

      // Add task to the new column
      if (!updatedColumns[newColumn]) {
        updatedColumns[newColumn] = [];
      }
      updatedColumns[newColumn].push(task);

      return updatedColumns;
    });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleView = (task) => {
    setViewingTask(task);
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setViewingTask(null);
    setShowForm(true);
  };

  const handleDelete = (taskId) => {
    handleDeleteTask(taskId);
  };

  if (loading) return <p>Loading...</p>;

  const columns = ["TODO", "IN_PROGRESS", "DONE"];

  return (
    <div className="task-container">
      <h2>Task Manager</h2>
      <button onClick={toggleForm} className="add">
        {showForm ? "Cancel" : "Add Task"}
      </button>
      {showForm && (
        <>
          <div className="task-overlay show" onClick={toggleForm} /> {/* Backdrop */}
          <TaskForm
            onSubmit={editingTask ? handleEditTask : handleAddTask}
            editingTask={editingTask}
            viewingTask={viewingTask}
            onCancel={() => {
              setEditingTask(null);
              setViewingTask(null);
              setShowForm(false);
            }}
            showForm={showForm}
          />
        </>
      )}
      <div>
        <SearchBar onSearch={handleSearch} onSort={handleSort} />
      </div>
      <div className="task-columns">
        {columns.map((column) => (
          <TaskColumn
            key={column}
            columnName={column}
            tasks={taskColumns[column] || []} // Ensure tasks is always an array
            onDragStart={handleDragStart}
            onDrop={(e) => handleDrop(e, column)}
            onDragOver={(e) => e.preventDefault()} // Allow drag over
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Task;
