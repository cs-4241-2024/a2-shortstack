const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library if you're testing this on your local machine.
  // However, Glitch will install it automatically by looking in your package.json
  // file.
  mime = require("mime"),
  dir = "public/",
  port = 3000;

let tab = [];
let nextId = 1;

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  } else if (request.method === "DELETE") {
    handleDelete(request, response);
  }
});

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else if (request.url === "/results.html") {
    console.log("sending results.html");
    response.end(JSON.stringify(tab));
    console.log(tab);
    sendFile(response, "public/results.html");
    console.log("results sent");
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    const newEntry = JSON.parse(dataString);
    newEntry.id = nextId++;
    console.log(newEntry.id);

    // ... do something with the data here!!!
    
    
    tab.push(newEntry);
    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(JSON.stringify(tab));
  });
};

const handleDelete = function (request, response) {
  const id = parseInt(request.url.split("/")[2], 10);
  console.log(`Deleting entry with ID: ${id}`);
  
  tab = tab.filter(entry => entry.id !== id);
  response.writeHead(200, "OK", { "Content-Type": "application/json" });
  response.end(JSON.stringify(tab));
};

const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
    // if the error = null, then we've loaded the file successfully
    if (err === null) {
      // status code: https://httpstatuses.com
      response.writeHeader(200, { "Content-Type": type });
      response.end(content);
    } else {
      // file not found, error code 404
      response.writeHeader(404);
      response.end("404 Error: File Not Found");
    }
  });
};

server.listen(process.env.PORT || port);
