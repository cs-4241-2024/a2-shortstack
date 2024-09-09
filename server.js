const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

let assignments = [];
let nextId = 1;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/assignments', (req, res) => {
    res.json(assignments);
});

app.post('/assignments', (req, res) => {
    const data = req.body;
    const assignment = {
        id: nextId++,
        class: data.class,
        name: data.assignment,
        dueDate: data['due-date'],
        startDate: data['start-date']
    };
    assignments.push(assignment);
    res.status(201).send();
});

app.put('/assignments/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedData = req.body;
    
    let assignment = assignments.find(a => a.id === id);
    
    if (assignment) {
        assignment.class = updatedData.class;
        assignment.name = updatedData.assignment;
        assignment.dueDate = updatedData['due-date'];
        assignment.startDate = updatedData['start-date'];
        
        console.log('Updated assignment:', assignment); // Debug log
        res.status(200).send();
    } else {
        res.status(404).send('Assignment not found');
    }
});

app.delete('/assignments/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    assignments = assignments.filter(a => a.id !== id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
