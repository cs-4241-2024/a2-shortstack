const http = require('http');
const fs = require('fs');
const mime = require('mime');
const dir = 'public/';
const port = 3000;

let appdata = [
  { model: 'toyota', year: 1999, mpg: 23, age: new Date().getFullYear() - 1999 },
  { model: 'honda', year: 2004, mpg: 30, age: new Date().getFullYear() - 2004 },
  { model: 'ford', year: 1987, mpg: 14, age: new Date().getFullYear() - 1987 }
];

const server = http.createServer(function(request, response) {
  if (request.method === 'GET') {
    handleGet(request, response);
  } else if (request.method === 'POST') {
    handlePost(request, response);
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
    data.age = new Date().getFullYear() - data.year;
    appdata.push(data);

    response.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
    response.end('Data added');
  });
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