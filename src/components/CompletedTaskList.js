import React from 'react';
import TaskList from './TaskList';

function CompletedTaskList({ tasks, handleDelete, handleUpdate, toggleCompletion }) {
  return (
    <div className='w-full'>
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

export default CompletedTaskList;
