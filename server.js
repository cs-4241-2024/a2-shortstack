const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

let tasks = [];
let nextId = 1;

function calculateDeadline(priority, creationDate) {
    const creation = new Date(creationDate);
    let deadline = new Date(creation);

    switch (priority) {
        case 'High':
            deadline.setDate(creation.getDate() + 1);
            break;
        case 'Medium':
            deadline.setDate(creation.getDate() + 3);
            break;
        case 'Low':
            deadline.setDate(creation.getDate() + 7);
            break;
    }

    return deadline.toISOString().split('T')[0];
}

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
    const { task, priority, creation_date } = req.body;
    const deadline = calculateDeadline(priority, creation_date);
    const newTask = { id: nextId++, task, priority, creation_date, deadline };
    tasks.push(newTask);
    res.json(newTask);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(task => task.id != req.params.id);
    res.sendStatus(204);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const { task, priority, creation_date } = req.body;
    const index = tasks.findIndex(t => t.id == req.params.id);
    if (index >= 0) {
        tasks[index] = {
            ...tasks[index],
            task,
            priority,
            creation_date,
            deadline: calculateDeadline(priority, creation_date)
        };
        res.json(tasks[index]);
    } else {
        res.sendStatus(404);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
