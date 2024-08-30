// src/components/ConfirmDialog.js
import React from 'react';

function ConfirmDialog({ isOpen, onConfirm, onCancel, taskTitle }) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-5 rounded-lg shadow-lg'>
        <h3 className='text-lg font-semibold mb-4'>Are you sure you want to delete "{taskTitle}"?</h3>
        <div className='flex gap-4'>
          <button 
            onClick={onConfirm} 
            className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'
          >
            Yes
          </button>
          <button 
            onClick={onCancel} 
            className='px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400'
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
