const http = require('http'),
    fs   = require('fs'),
    mime = require('mime'),
    dir  = 'public/',
    port = 3001;

let todos = [
    { id: 1, task: 'Sample Task 1', description: 'none', priority: 'Low', created_at: new Date().toISOString() },
];

const server = http.createServer(function (request, response) {
    if (request.method === 'GET') {
        handleGet(request, response);
    } else if (request.method === 'POST') {
        handlePost(request, response);
    } else if (request.method === 'DELETE') {
        handleDelete(request, response);
    } else if (request.method === 'PUT') {
        handlePut(request, response);
    }
});

const handleGet = function (request, response) {
    if (request.url === '/') {
        sendFile(response, 'public/index.html');
    } else if (request.url === '/data') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(todos));
    } else {
        const filename = dir + request.url.slice(1);
        sendFile(response, filename);
    }
};

const handlePost = function (request, response) {
    let dataString = '';

    request.on('data', function (data) {
        dataString += data;
    });

    request.on('end', function () {
        const newItem = JSON.parse(dataString);
        newItem.id = todos.length ? todos[todos.length - 1].id + 1 : 1; // Generate a new ID
        newItem.due_date = calculateDueDate(newItem.priority, newItem.created_at);
        todos.push(newItem);

        console.log('New item added:', newItem); // Debugging log
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(todos));
    });
};

const handleDelete = function (request, response) {
    const id = parseInt(request.url.split('/')[2], 10);
    todos = todos.filter(item => item.id !== id);

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(todos));
};

const handlePut = function (request, response) {
    let dataString = '';

    request.on('data', function (data) {
        dataString += data;
    });

    request.on('end', function () {
        const updatedItem = JSON.parse(dataString);
        todos = todos.map(item => item.id === updatedItem.id ? { ...item, ...updatedItem } : item);
        updatedItem.due_date = calculateDueDate(updatedItem.priority, updatedItem.created_at);

        console.log('Item updated:', updatedItem);
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(todos));
    });
};

const calculateDueDate = function (priority, createdAt) {
    const creationDate = new Date(createdAt);
    let daysToAdd;

    switch (priority) {
        case 'High':
            daysToAdd = 3;
            break;
        case 'Medium':
            daysToAdd = 7;
            break;
        case 'Low':
            daysToAdd = 14;
            break;
        default:
            daysToAdd = 0;
    }

    const dueDate = new Date(creationDate);
    dueDate.setDate(dueDate.getDate() + daysToAdd);

    return dueDate.toISOString().split('T')[0];
};

const sendFile = function (response, filename) {
    const type = mime.getType(filename);

    fs.readFile(filename, function (err, content) {
        if (err === null) {
            response.writeHead(200, { 'Content-Type': type });
            response.end(content);
        } else {
            response.writeHead(404);
            response.end('404 Error: File Not Found');
        }
    });
};

server.listen(process.env.PORT || port);