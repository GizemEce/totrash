import React from 'react'
import { AiFillEdit } from 'react-icons/ai';
import { FaTrashAlt } from "react-icons/fa";

const Todo = ({task, deleteTodo, editTodo}) => {
  return (
    <div className='flex justify-between item-center bg-[#98d1bf] mt-2 p-2 rounded-lg'>
        <p className='font-primary'> {task.task}</p>
        <div className='flex items-center gap-x-4'>
            <AiFillEdit
                data-testid={`edit-icon-${task.id}`}
                className='text-xl'
                onClick={() => editTodo(task.id)}/>
            <FaTrashAlt
                data-testid={`delete-icon-${task.id}`}
                className='text-xl'
                onClick={() => deleteTodo(task.id)}/>
        </div>
    </div>
  )
}

export default Todo