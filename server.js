const express = require('express');
const app = express();


const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function (request, response) {
    let filePath = '.' + request.url;
    if (filePath === './') {
      filePath = './index.html';
    }
  
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.gif': 'image/gif',
      '.wav': 'audio/wav',
      '.mp4': 'video/mp4',
      '.woff': 'application/font-woff',
      '.ttf': 'application/font-ttf',
      '.eot': 'application/vnd.ms-fontobject',
      '.otf': 'application/font-otf',
      '.svg': 'application/image/svg+xml',
    };
  
    const contentType = mimeTypes[extname] || 'application/octet-stream';
  
    fs.readFile(filePath, function (error, content) {
      if (error) {
        if (error.code == 'ENOENT') {
          response.writeHead(404, { 'Content-Type': 'text/html' });
          response.end('<h1>404 Not Found</h1>', 'utf-8');
        } else {
          response.writeHead(500);
          response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
        }
      } else {
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(content, 'utf-8');
      }
    });
  });













app.use(express.json());
app.use(express.static(__dirname + '/public'));

let todos = [];

// Helper function to generate a deadline based on priority if not provided
const generateDeadline = (priority) => {
    const date = new Date();
    date.setDate(date.getDate() + (priority * 2));
    return date.toISOString().split('T')[0];
};

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Add a new todo
app.post('/add', (req, res) => {
    const { task, priority, deadline } = req.body;
    const id = Date.now().toString();
    const generatedDeadline = deadline || generateDeadline(priority);

    const newTodo = { id, task, priority: parseInt(priority), deadline: generatedDeadline };
    todos.push(newTodo);
    todos = sortTodos(todos); // Sort after adding
    res.json(todos); // Return updated todo list
});

// Delete a todo
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id !== id);
    todos = sortTodos(todos); // Sort after deletion
    res.json(todos); // Return updated todo list
});

// Update an existing todo
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { task, priority, deadline } = req.body;

    todos = todos.map(todo => 
        todo.id === id ? { ...todo, task, priority: parseInt(priority), deadline } : todo
    );
    todos = sortTodos(todos); // Sort after editing
    res.json(todos); // Return updated todo list
});

// Function to sort todos based on priority and deadline
const sortTodos = (todos) => {
    return todos.sort((a, b) => {
        if (a.priority !== b.priority) {
            return b.priority - a.priority; // Higher priority first
        }
        return new Date(a.deadline) - new Date(b.deadline); // Earlier deadline first
    });
};

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
