const http = require('http'),
  fs = require('fs'),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library if you're testing this on your local machine.
  // However, Glitch will install it automatically by looking in your package.json
  // file.
  mime = require('mime'),
  dir = 'public/',
  port = 3000

let appdata = [];

const server = http.createServer(function (request, response) {
  if (request.method === 'GET') {
    handleGet(request, response)
  } else if (request.method === 'POST') {
    handlePost(request, response)
  }
})

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);
  if (request.url === '/') {
    sendFile(response, 'public/index.html');
  }
  else if (request.url === '/data') {
    response.end(JSON.stringify(appdata));
  }
  else {
    sendFile(response, filename);
  }
}

const handlePost = function (request, response) {
  let dataString = '';
  console.log("In handlePost");
  request.on('data', function (data) {
    dataString += data;
  })

  request.on('end', function () {
    const newData = JSON.parse(dataString);
    const classCode = newData.classCode;
    const className = newData.className;
    const assignment = newData.assignment;
    const daysLeft = newData.days;
    //TODO: Make date calculations

    appdata.push({
      'classCode': classCode,
      'className': className,
      'assignment': assignment,
      'daysLeft': daysLeft
    });
    console.log(JSON.parse(dataString))

    // ... do something with the data here!!!

    response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata))
  })
}

const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {

    // if the error = null, then we've loaded the file successfully
    if (err === null) {

      // status code: https://httpstatuses.com
      response.writeHeader(200, { 'Content-Type': type })
      response.end(content)

    } else {

      // file not found, error code 404
      response.writeHeader(404)
      response.end('404 Error: File Not Found')

    }
  })
}

server.listen(process.env.PORT || port)
