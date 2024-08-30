import React, { useEffect, useState } from 'react'

function TaskInput({ addTask }) {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        createdAt: '',
    })

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        const { title, description, createdAt } = formData

        if(title.trim() === ''){
            alert('Title can\'t be blank')
        } else {
            addTask({
                title,
                description,
                completed: false,
                createdAt: Date.now(),
                // createdAt: 1722940800,
            })
            setFormData({
                title: '',
                description: '',
                createdAt: '',
            })
            alert('Task Added Successfully')
        }    
    }

  return (
    <div className=' h-full w-full'>
        <form onSubmit={handleSubmit} className=' h-full flex flex-col w-full gap-5 p-7 dark:border dark:border-none bg-slate-50 dark:bg-gray-800 shadow-lg rounded-3xl'>
            <input type='text' name='title' placeholder='Title' required
            value={formData.title}
            onChange={handleChange}
            className=' w-full p-3 border border-gray-200 dark:bg-gray-800 rounded-lg outline-none' />
            <textarea name='description' placeholder='Description'
            value={formData.description}
            onChange={handleChange}
            className=' p-3 border border-gray-200 dark:bg-gray-800 rounded-lg outline-none' rows={6}></textarea>
            <button type='submit' name='submit'
            className=' w-full py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500'>Submit</button>
        </form>
    </div>
  )
}

export default TaskInput
