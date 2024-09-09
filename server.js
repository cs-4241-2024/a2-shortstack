const http = require('http'),
    fs   = require('fs'),
    mime = require('mime'),
    dir  = 'public/',
    port = 3000;

let appdata = [
  // Initial dummy data
  { id: 1, type: 'work', details: { course: 'Math', ddl: '2024-09-10', expectedTime: '13:00', actualTime: '14:00' }},
  { id: 2, type: 'entertainment', details: { entertainmentType: 'music' }},
  { id: 3, type: 'sleep', details: { sleepDate: '2024-09-05', sleepTime: '23:00' }}
];

// Create an incremental ID for new entries
let idCounter = 4;

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
  } else if (request.url === '/activities') {
    // Handle GET request for the activities list
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(appdata));
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
    const parsedData = JSON.parse(dataString);

    if (parsedData.action === 'add') {
      // Add new activity
      const newActivity = { id: idCounter++, type: parsedData.type, details: parsedData.details };
      appdata.push(newActivity);

      response.writeHead(200, "OK", { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Activity added', data: newActivity }));
    } else if (parsedData.action === 'edit') {
      // Edit existing activity
      const index = appdata.findIndex(activity => activity.id === parsedData.id);
      if (index !== -1) {
        appdata[index].details = parsedData.details;
        response.writeHead(200, "OK", { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'Activity edited', data: appdata[index] }));
      } else {
        response.writeHead(404, "Not Found", { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'Activity not found' }));
      }
    }
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
