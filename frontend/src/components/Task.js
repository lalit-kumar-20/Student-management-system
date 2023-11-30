import React from 'react';

const Task = ({ task, onStatusChange }) => {
  const handleStatusChange = (newStatus) => {
    onStatusChange(task._id, newStatus);
  };

  return (
    <div>
      <p>{task.name}</p>
      <p>{task.dueTime}</p>
      <p>Status: {task.status}</p>
      <button onClick={() => handleStatusChange('completed')}>Mark as Completed</button>
      <button onClick={() => handleStatusChange('pending')}>Mark as Pending</button>
    </div>
  );
};

export default Task;
