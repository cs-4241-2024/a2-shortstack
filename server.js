const http = require('http'),
  fs = require('fs'),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library if you're testing this on your local machine.
  // However, Glitch will install it automatically by looking in your package.json
  // file.
  mime = require('mime'),
  dir = 'public/',
  port = 3000

let scores = [];

const server = http.createServer(function (request, response) {
  if (request.method === 'GET') {
    handleGet(request, response)
  } else if (request.method === 'POST') {
    handlePost(request, response)
  }
})

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1)

  if (request.url === '/scores') {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ scores: scores }))
  } else if (request.url === '/' || request.url.endsWith('/')) {
    sendFile(response, 'public/index.html')
  } else {
    sendFile(response, filename)
  }
}

const handlePost = function (request, response) {
  let dataString = ''

  request.on('data', (data) => {
    dataString += data;
  });

  request.on('end', () => {
    switch (request.url) {
      case '/reset-score':
        return resetScore(response);
      case '/save-score':
        return saveScore(response, dataString);
      case '/save-name':
        return saveName(response, dataString);
      default:
        return notFound(response);
    }
  })
};

const resetScore = (response) => {
  scores = [];
  response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
  response.end(JSON.stringify({ message: 'Score reset successfully', scores: scores }));
}

const saveScore = (response, dataString) => {
  const data = JSON.parse(dataString);
  const score = data.score;
  const name = data.name;
  scores.push({ name: name, score: score });

  response.writeHead(200, "OK", { 'Content-Type': 'text/plain' });
  response.end(JSON.stringify({ message: 'Score saved successfully', scores: scores }));
}

const saveName = (resposne, dataString) => {
  const data = JSON.parse(dataString);
  const name = data.name;

  resposne.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
  resposne.end(JSON.stringify({ message: 'Name saved successfully' }));
}

const notFound = (response) => {
  response.writeHead(404, 'Not Found', { 'Content-Type': 'text/plain' });
  response.end('Page not found');
};

const sendFile = function (response, filename) {
  const type = mime.getType(filename)

  fs.readFile(filename, function (err, content) {
    // if the error = null, then we've loaded the file successfully
    if (err === null) {
      // status code: https://httpstatuses.com
      response.writeHeader(200, { 'Content-Type': type })
      response.end(content)
    } else {
      console.error('file not found: ' + filename)
      // file not found, error code 404
      response.writeHeader(404)
      response.end('404 Error: File Not Found')
    }
  })
}

server.listen(process.env.PORT || port)
