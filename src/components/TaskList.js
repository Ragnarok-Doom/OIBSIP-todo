import React from 'react';
import { IoCheckmarkSharp } from "react-icons/io5";
import { MdEdit, MdDelete } from "react-icons/md";

function TaskList({ tasks, handleDelete, handleUpdate, toggleCompletion, showCompletionColumn = true, showIcons = true }) {
  return (
    <div className=' w-[700px] md:w-full h-full'>
      {/* Header Row */}
      <div className={` w-[700px] lg:w-full grid ${ showCompletionColumn ? 'grid-cols-6' : 'grid-cols-4'} gap-4 p-3 font-semibold dark:bg-gray-800`}>
        <span>#</span>
        <span>Title</span>
        <span>Description</span>
        {showCompletionColumn && <span>Status</span>}
        {showIcons && <span>Actions</span>}
        <span>Date</span>
      </div>
      
      {/* Task List */}
      <div className='w-[700px] lg:w-full h-full'>
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`grid ${ showCompletionColumn ? 'grid-cols-6' : 'grid-cols-4'} gap-4 p-3 mb-3 ${task.completed && showCompletionColumn ? 'dark:bg-green-400 bg-green-100' : 'dark:bg-gray-700 bg-slate-100'} items-center hover:opacity-[0.7]`}
          >
            <span>{index + 1}</span>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            {showCompletionColumn && (
              <span>{task.completed ? 'Completed' : 'Pending'}</span>
            )}
            {showIcons && (
              <div className='flex items-center gap-3'>
                <IoCheckmarkSharp
                  className='border rounded-full border-green-500 text-green-500 dark:text-white dark:border-white p-1 text-2xl cursor-pointer'
                  onClick={() => toggleCompletion(index, !task.completed)}
                />
                <MdEdit
                  className='p-1 text-3xl bg-slate-200 rounded-md cursor-pointer dark:bg-gray-600'
                  onClick={() => handleUpdate(index)}
                />
                <MdDelete
                  className='p-1 text-3xl bg-slate-200 rounded-md cursor-pointer dark:bg-gray-600'
                  onClick={() => handleDelete(index)}
                />
              </div>
            )}
            <span>{ showCompletionColumn ? 
                new Date(task.createdAt).toLocaleString()
                : new Date(task.createdAt).toLocaleDateString() 
                }</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
