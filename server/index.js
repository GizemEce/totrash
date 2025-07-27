// index.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const users = [{ 
    email: 'test@rem.com', 
    password: '123456' 
}];

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

let todos = [];

app.get('/items', (req, res) => {
     res.json(todos);
});

app.post('/items', (req, res) => {
    const { task } = req.body;

    if (!task || typeof task !== 'string' || task.trim() === '') {
        return res.status(400).json({ message: 'Task is required' });
    }

    const newTodo = { id: Date.now().toString(), task };
    todos.push(newTodo);
    res.json(newTodo);
});

app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos[index].task = task;
        res.json(todos[index]);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

app.delete('/items/:id', (req, res) => {
    todos = todos.filter(t => t.id !== req.params.id);
    res.json({ message: 'Deleted successfully' });
});

module.exports = app;
