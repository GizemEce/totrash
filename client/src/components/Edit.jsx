import React, { useState } from 'react'

const Edit = ({editTodo, task}) => {
    const [value, setValue] = useState(task.task);
    
    const handleSubmit = event => {
        event.preventDefault();
        editTodo(value, task.id);
        setValue('');
    }

    return (
        <form 
            className='flex mb-2 mt-2'
            onSubmit={handleSubmit}>
            <input
                type="text"
                className='border-2 border-[#00df9a] p-2 rounded-xl flex-1 focus:outline-none'
                placeholder='Edit trash'
                value={value}
                onChange={(event) => setValue(event.target.value)}/>
            <button 
                className='bg-[#00df9a] border-none p-2 text-white cursor-pointer rounded-xl ml-2'>
                Edit
            </button>
        </form>
    )
}

export default Edit