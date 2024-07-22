import React from "react";

const TaskColumn = ({ columnName, tasks = [], onDragStart, onDrop, onDragOver, onView, onEdit, onDelete }) => {
  return (
    <div
      className="task-column"
      onDragOver={(e) => e.preventDefault()} // Allow drag over
      onDrop={(e) => onDrop(e, columnName)} // Pass columnName to handleDrop
    >
      <h3>{columnName}</h3>
      {tasks.map((task) => (
        task ? ( // Ensure task is not undefined
          <div
            key={task._id}
            className="task-item"
            draggable
            onDragStart={(e) => onDragStart(e, task._id)} // Pass task ID to handleDragStart
          >
            <h4>{task.title || "No Title"}</h4> {/* Default value if title is undefined */}
            <p>{task.description || "No Description"}</p> {/* Default value if description is undefined */}
            <small>createdAt: {new Date(task.createdAt).toLocaleString()}</small>
            <div className="buttons">
              <button onClick={() => onView(task)} className="view">View</button>
              <button onClick={() => onEdit(task)} className="edit">Edit</button>
              <button onClick={() => onDelete(task._id)} className="delete">Delete</button>
            </div>
          </div>
        ) : null // Skip rendering if task is undefined
      ))}
    </div>
  );
};

export default TaskColumn;
