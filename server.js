const http = require('http'),
      fs   = require('fs'),
      mime = require('mime'),
      dir  = 'public/',
      port = 3000;

const appdata = []; // List to hold names with their lengths

// Create the server
const server = http.createServer(function(request, response) {
  if (request.method === 'GET') {
    handleGet(request, response);
  } else if (request.method === 'POST') {
    handlePost(request, response);
  } else if (request.method === 'DELETE'){
    handleDelete(request, response);
  }
});

// Handle GET requests
const handleGet = function(request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === '/') {
    // Serve the index.html file
    sendFile(response, 'public/index.html');
  } else if (request.url === '/data') {
    // Respond with the appdata array as JSON, now including names and their lengths
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(appdata));  // Send appdata as JSON
  } else {
    // Serve static files like main.js, style.css, etc.
    sendFile(response, filename);
  }
};

// Handle POST requests (e.g., adding a new name)
const handlePost = function(request, response) {
  let dataString = '';

  request.on('data', function(data) {
    dataString += data;
  });

  request.on('end', function() {
    // Parse the incoming data
    const receivedData = JSON.parse(dataString);

    // Add the new name and its length to appdata
    if (receivedData.name) {
      const name = receivedData.name;
      const nameLength = name.length;

      // Push an object with the name and its length into appdata
      appdata.push({ name: name, length: nameLength });
    }

    // Respond with the updated appdata array
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ data: appdata }));
  });
};

// Handle DELETE requests
const handleDelete = function(request, response) {
  const id = parseInt(request.url.split('/').pop());

  if (!isNaN(id) && id >= 0 && id < appdata.length) {
    appdata.splice(id, 1); // Remove the name from appdata
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ data: appdata }));
  } else {
    response.writeHead(400, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ error: 'Invalid index' }));
  }
};

// Serve static files like HTML, JS, and CSS
const sendFile = function(response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function(err, content) {
    if (err === null) {
      // File loaded successfully
      response.writeHeader(200, { 'Content-Type': type });
      response.end(content);
    } else {
      // File not found, send 404 error
      response.writeHeader(404);
      response.end('404 Error: File Not Found');
    }
  });
};

// Start the server
server.listen(process.env.PORT || port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
