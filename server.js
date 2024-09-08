const http = require("http");
const fs = require("fs");
// IMPORTANT: you must run `npm install` in the directory for this assignment
// to install the mime library if you're testing this on your local machine.
// However, Glitch will install it automatically by looking in your package.json
// file.
const mime = require("mime");
const dir = "public/";
const port = 3000;

let tasks = [];

// const appdata = [
//   {
//     task: "Do the dishes",
//     description: "Wash, dry, and put away the dishes",
//     date: "2024-10-01",
//     priority: "High",
//   },
// ];

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  } else {
    // If the request method is something else (PUT, DELETE, etc.), return 405 Method Not Allowed
    response.writeHead(405, { "Content-Type": "text/plain" });
    response.end("Method Not Allowed");
  }
});

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/" || request.url === "/index.html") {
    sendFile(response, "public/index.html", "text/html");
  } else if (request.url === "/tasks") {
    // Serve the list of tasks as JSON
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(tasks)); // Send back the tasks array
  } else {
    sendFile(response, filename, mime.getType(filename));
  }
};

const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    const parsedData = JSON.parse(dataString);

    if (request.url === "/submit") {
      const newTask = {
        task: parsedData.task,
        description: parsedData.description,
        date: parsedData.date,
        priority: parsedData.priority,
        status: "In Progress", // Default status for new tasks
      };

      tasks.push(newTask);

      // Respond with the updated task list
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(
        JSON.stringify({ message: "Task added successfully!", tasks })
      );
    } else {
      // If the route is not recognized for POST, return 404 Not Found
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("Not Found");
    }
  });
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

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
