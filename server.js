// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// In-memory data store for todo items
let todoList = [];

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Route to handle adding new tasks
app.post('/add', (req, res) => {
  const { taskName, dueDate, priority } = req.body;
  const daysRemaining = calculateDaysRemaining(dueDate);

  // Create a new task object with a derived field
  const newTask = { taskName, dueDate, priority, daysRemaining };
  todoList.push(newTask);
  res.json(todoList);
});

// Route to handle deleting a task
app.post('/delete', (req, res) => {
  const { taskName } = req.body;
  todoList = todoList.filter(task => task.taskName !== taskName);
  res.json(todoList);
});

// Route to handle modifying a task
app.post('/modify', (req, res) => {
  const { oldTaskName, newTaskName, dueDate, priority } = req.body;
  const daysRemaining = calculateDaysRemaining(dueDate);
  const taskIndex = todoList.findIndex(task => task.taskName === oldTaskName);

  if (taskIndex !== -1) {
    todoList[taskIndex] = { taskName: newTaskName, dueDate, priority, daysRemaining };
  }
  res.json(todoList);
});

// Route to fetch all tasks
app.get('/results', (req, res) => {
  res.json(todoList);
});

// Function to calculate the number of days remaining days
function calculateDaysRemaining(dueDate) {
  const due = new Date(dueDate);
  const today = new Date();
  const timeDifference = due - today;
  return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
