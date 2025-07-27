import React, { useEffect, useState } from 'react';
import Form from './Form';
import Todo from './Todo';
import Edit from './Edit';

const TodoList = () => {
    const [todoValue, setTodo] = useState([]);

    // Fetch todos on mount
    useEffect(() => {
        fetch('http://localhost:5000/items')
            .then(res => res.json())
            .then(data => setTodo(data))
            .catch(err => console.error('Fetch error:', err));
    }, []);

    // Create todo
    const createTodo = task => {
        fetch('http://localhost:5000/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task })
        })
        .then(res => res.json())
        .then(newTodo => setTodo(prev => [...prev, newTodo]));
    };

    // Delete todo
    const deleteTodo = id => {
        fetch(`http://localhost:5000/items/${id}`, {
            method: 'DELETE'
        }).then(() => setTodo(prev => prev.filter(todo => todo.id !== id)));
    };

    // Toggle edit mode
    const editTodo = id => {
        setTodo(prev => prev.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
    };

    // Update task
    const editTask = (task, id) => {
        fetch(`http://localhost:5000/items/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task })
        })
        .then(res => res.json())
        .then(updated => {
            setTodo(prev => prev.map(todo => todo.id === id ? { ...updated, isEditing: false } : todo));
        });
    };

    return (
        <div className='bg-white w-full lg:w-1/3 md:w-1/2 rounded-xl shadow-lg p-4'>
            <Form createTodo={createTodo} />
            {
                todoValue.map((todo, idx) => (
                    todo.isEditing ? (
                        <Edit key={idx} editTodo={editTask} task={todo} />
                    ) : (
                        <Todo key={idx} task={todo} deleteTodo={deleteTodo} editTodo={editTodo} />
                    )
                ))
            }
        </div>
    );
};

export default TodoList;
