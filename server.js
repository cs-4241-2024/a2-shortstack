const http = require('http'),
  fs = require('fs'),
  mime = require('mime'),
  dir = 'public/',
  port = 3000;

let appData = [];

const server = http.createServer(function (request, response) {
  if (request.method === 'GET') {
    handleGet(request, response);
  } else if (request.method === 'POST') {
    handlePost(request, response);
  }
});

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);
  if (request.url === '/') {
    sendFile(response, 'public/index.html');
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function (request, response) {
  let dataString = '';

  request.on('data', function (data) {
    dataString += data;
  });

  request.on('end', function () {
    let parsedData = JSON.parse(dataString);
    let times = parsedData.times;

    // Calculate average time
    let averageTime = (
      times.reduce((acc, curr) => acc + parseFloat(curr), 0) / times.length
    ).toFixed(2);

    // Add derived field (average time) and save data
    parsedData.averageTime = averageTime;
    appData.push(parsedData);

    response.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(appData));
  });
};

const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
    if (err === null) {
      response.writeHeader(200, { 'Content-Type': type });
      response.end(content);
    } else {
      response.writeHeader(404);
      response.end('404 Error: File Not Found');
    }
  });
};

server.listen(process.env.PORT || port);
