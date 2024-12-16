const http = require('http'),
      fs   = require('fs'),
      mime = require('mime'),
      port = 3000;

let tasks = [
  {
    id: 1,
    description: 'A1',
    priority: 'High',
    dueDate: '2024-09-15',
    urgency: 10
  },
  {
    id: 2,
    description: 'A2',
    priority: 'Medium',
    dueDate: '2024-09-20',
    urgency: 6
  },
  {
    id: 3,
    description: 'A3',
    priority: 'Low',
    dueDate: '2024-09-25',
    urgency: 2
  }
];

const server = http.createServer(function(request, response) {
  if (request.method === 'GET') {
    handleGet(request, response);
  } else if (request.method === 'POST') {
    handlePost(request, response);
  } else if (request.method === 'DELETE') {
    handleDelete(request, response);
  } else if (request.method === 'PUT') {
    handlePut(request, response);
  }else {
    response.writeHead(405, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ success: false, message: 'Method Not Allowed' }));
  }
});

const handleGet = function(request, response) {
  if (request.url === '/') {
    sendFile(response, 'public/index.html');
  } else if (request.url === '/tasks') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(tasks));
  } else {
    sendFile(response, 'public' + request.url);
  }
};

const calculateUrgencyForTask = (task) => {
  let urgency = 0;

  if (task.priority === 'High') {
    urgency += 5;
  } else if (task.priority === 'Medium') {
    urgency += 3;
  } else if (task.priority === 'Low') {
    urgency += 1;
  }


  const currentDate = new Date();
  const dueDate = new Date(task.dueDate);
  

  if (isNaN(dueDate.getTime())) {
    throw new Error('Invalid dueDate format');
  }


  const timeDiff = (dueDate - currentDate) / (1000 * 60 * 60 * 24);  

  if (timeDiff <= 2) {
    urgency += 5;  
  } else if (timeDiff <= 7) {
    urgency += 2;  
  } else {
    urgency += 1;  
  }

  return Number(urgency);
};


const handlePost = function(request, response) {
  let body = '';

  request.on('data', chunk => {
    body += chunk.toString();
  });

  request.on('end', () => {
    try {
      const newTask = JSON.parse(body);


      newTask.urgency = calculateUrgencyForTask(newTask);

      newTask.id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
      tasks.push(newTask);

      response.writeHead(201, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(newTask));
    } catch (error) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ success: false, message: 'Invalid JSON' }));
    }
  });
};

const handlePut = function(request, response) {
  const taskId = parseInt(request.url.split('/').pop(), 10);  
  let body = '';

  request.on('data', chunk => {
    body += chunk.toString();
  });

  request.on('end', () => {
    const updatedTask = JSON.parse(body);  

    const taskIndex = tasks.findIndex(task => task.id === taskId);  

    if (taskIndex !== -1) {
      // Update the task fields
      tasks[taskIndex].description = updatedTask.description;
      tasks[taskIndex].priority = updatedTask.priority;
      tasks[taskIndex].dueDate = updatedTask.dueDate;

      tasks[taskIndex].urgency = calculateUrgencyForTask(tasks[taskIndex]);

      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(tasks[taskIndex]));  
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ success: false, message: 'Task not found' }));
    }
  });
};


const handleDelete = function(request, response) {
  const taskId = parseInt(request.url.split('/').pop(), 10);

  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ success: true, tasks }));
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ success: false, message: 'Task not found' }));
  }
};

const sendFile = function(response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function(err, content) {
    if (err === null) {
      response.writeHead(200, { 'Content-Type': type });
      response.end(content);
    } else {
      response.writeHead(404);
      response.end('404 Error: File Not Found');
    }
  });
};

server.listen(process.env.PORT || port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
