const http = require('http');
const fs = require('fs');
const mime = require('mime');
const dir = 'public/';
const port = 3000;

let appdata = [
  { name: 'Assignment 1', points: 100, score: 90, difficulty: 5 },
  { name: 'Assignment 2', points: 50, score: 45, difficulty: 3 },
  { name: 'Assignment 3', points: 75, score: 70, difficulty: 7 }
];

const server = http.createServer(function(request, response) {
  if (request.method === 'GET') {
    handleGet(request, response);
  } else if (request.method === 'POST') {
    handlePost(request, response);
  } else if (request.method === 'PUT') {
    handlePut(request, response);
  } else if (request.method === 'DELETE') {
    handleDelete(request, response);
  }
});

const handleGet = function(request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === '/') {
    sendFile(response, 'public/index.html');
  } else if (request.url === '/data') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(appdata));
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function(request, response) {
  let dataString = '';

  request.on('data', function(data) {
    dataString += data;
  });

  request.on('end', function() {
    const data = JSON.parse(dataString);
    appdata.push(data);

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(appdata));
  });
};

const handlePut = function(request, response) {
  const index = parseInt(request.url.split('/').pop(), 10);
  let dataString = '';

  request.on('data', function(data) {
    dataString += data;
  });

  request.on('end', function() {
    const data = JSON.parse(dataString);
    appdata[index] = data;

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(appdata));
  });
};

const handleDelete = function(request, response) {
  const index = parseInt(request.url.split('/').pop(), 10);
  appdata.splice(index, 1);

  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(appdata));
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

server.listen(process.env.PORT || port);