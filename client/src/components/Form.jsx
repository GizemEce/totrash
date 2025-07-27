import React, { useState } from 'react';

const Form = ({ createTodo }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (value.trim() === '') {
      setError('Please type something!');
      return;
    }
    createTodo(value);
    setValue('');
    setError('');
  };

  return (
    <form className='w-full' onSubmit={handleSubmit}>
      <div className='flex'>
        <input
            type="text"
            className='border-2 border-[#00df9a] p-2 rounded-xl flex-1 focus:outline-none'
            placeholder='What trash is on your mind?'
            value={value}
            onChange={(event) => setValue(event.target.value)}
        />
        <button
            type="submit"
             className='bg-[#00df9a] border-none p-2 text-white cursor-pointer rounded-xl ml-2'
        >
            Add Trash
        </button>
      </div>

      {error && <p className='text-red-500 mt-2 text-sm'>{error}</p>}
    </form>
  );
};

export default Form;
