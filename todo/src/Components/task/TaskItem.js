import React from "react";
import "./taskItem.css";

const TaskItem = ({ task, onDragStart, onView = () => {}, onEdit = () => {}, onDelete = () => {} }) => (
  <div
    key={task._id}
    draggable
    onDragStart={(e) => onDragStart(e, task)}
    className="task-item"
  >
    <h4>{task.title}</h4>
    <p>{task.description}</p>
    <small>createdAt: {new Date(task.createdAt).toLocaleString()}</small>
    <div className="task-item-buttons">
      <button onClick={() => onView(task)}>View</button>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  </div>
);

export default TaskItem;
