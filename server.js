const http = require('http');
const fs = require('fs');
const url = require('url');

let data = [
  { id: 1, task: 'Buy groceries', priority: 'High', creation_date: '2024-09-08', deadline: '2024-09-09' },
  { id: 2, task: 'Pay bills', priority: 'Medium', creation_date: '2024-09-08', deadline: '2024-09-10' }
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  if (path === '/' && req.method === 'GET') {
    // Serve the HTML form and data list
    fs.readFile('public/index.html', (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading page');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
  } else if (path === '/results' && req.method === 'GET') {
    // Serve the dataset as a JSON response
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  } else if (path === '/add' && req.method === 'POST') {
    // Handle new task submission
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const formData = new URLSearchParams(body);
      const task = formData.get('task');
      const priority = formData.get('priority');
      const creation_date = new Date().toISOString().split('T')[0];

      // Derived field: deadline based on priority
      const deadline = computeDeadline(creation_date, priority);

      const newEntry = { id: data.length + 1, task, priority, creation_date, deadline };
      data.push(newEntry);

      res.writeHead(302, { Location: '/' });
      res.end();
    });
  } else if (path === '/delete' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const formData = new URLSearchParams(body);
      const idToDelete = parseInt(formData.get('id'), 10);

      data = data.filter(item => item.id !== idToDelete);

      res.writeHead(302, { Location: '/' });
      res.end();
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

const computeDeadline = (creation_date, priority) => {
  const date = new Date(creation_date);
  if (priority === 'High') {
    date.setDate(date.getDate() + 1);
  } else if (priority === 'Medium') {
    date.setDate(date.getDate() + 3);
  } else {
    date.setDate(date.getDate() + 5);
  }
  return date.toISOString().split('T')[0];
};

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
