// src/Pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
// import './dashboard.css'; // Add or modify your CSS file

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks'); // Adjust endpoint if needed
        setTasks(response.data); // Assuming response.data is an array of tasks
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    // Reorder the tasks in the state
    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, movedTask);

    setTasks(reorderedTasks);

    // Update the backend with the new order
    try {
      await axios.put('/api/tasks/update', reorderedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks" direction="vertical">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="dashboard"
          >
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="task"
                  >
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Dashboard;
