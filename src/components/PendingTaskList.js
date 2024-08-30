import React from 'react';
import TaskList from './TaskList';

function PendingTaskList({ tasks, handleDelete, handleUpdate, toggleCompletion }) {
  return (
    <div className='w-full h-full'>
      <TaskList
        tasks={tasks}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        toggleCompletion={toggleCompletion}
        showCompletionColumn={false}
        showIcons={false}
      />
    </div>
  );
}

export default PendingTaskList;
