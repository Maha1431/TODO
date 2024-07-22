import React, { useState, useEffect } from "react";
import './taskform.css';  // Import the CSS file

const TaskForm = ({ onSubmit, editingTask, viewingTask, onCancel, showForm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else if (viewingTask) {
      setTitle(viewingTask.title);
      setDescription(viewingTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask, viewingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!viewingTask) { // Only submit if not viewing
      onSubmit({ title, description });
    }
    onCancel(); // Close the form after submission or cancel
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`task-form ${showForm ? 'show' : ''}`}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        readOnly={!!viewingTask} // Set to read-only if viewingTask is true
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
        readOnly={!!viewingTask} // Set to read-only if viewingTask is true
      />
      {!viewingTask && <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>}
      <button type="button" onClick={onCancel} className="cancel">Cancel</button>
    </form>
  );
};

export default TaskForm;
