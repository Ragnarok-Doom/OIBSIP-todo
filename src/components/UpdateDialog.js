// src/components/UpdateDialog.js
import React, { useState, useEffect } from 'react';

function UpdateDialog({ isOpen, onClose, onUpdate, task }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-5 rounded-lg shadow-lg w-[70%] md:w-[25vw]'>
        <h3 className='text-lg font-semibold mb-4'>Update Task</h3>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='text'
            name='title'
            placeholder='Title'
            value={formData.title}
            onChange={handleChange}
            className='p-2 border border-gray-300 rounded-lg'
            required
          />
          <textarea
            name='description'
            placeholder='Description'
            value={formData.description}
            onChange={handleChange}
            className='p-2 border border-gray-300 rounded-lg'
            rows={4}
          />
          <div className='flex gap-4 mt-4'>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
            >
              Update
            </button>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateDialog;
