const http = require("http");
const fs = require("fs");
const mime = require("mime");
const dir = "public/";
const port = 3000;

let tasks = []; // Store tasks here

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  } else if (request.method === "PUT") {
    if (request.url.startsWith("/complete/")) {
      handleComplete(request, response);
    } else if (request.url.startsWith("/in-progress/")) {
      handleInProgress(request, response);
    } else {
      handlePut(request, response);
    }
  } else if (request.method === "DELETE") {
    handleDelete(request, response);
  } else {
    response.writeHead(405, { "Content-Type": "text/plain" });
    response.end("Method Not Allowed");
  }
});

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/" || request.url === "/index.html") {
    sendFile(response, "public/index.html", "text/html");
  } else if (request.url === "/tasks") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(tasks));
  } else {
    sendFile(response, filename, mime.getType(filename));
  }
};

// Handle adding a new task
const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    const parsedData = JSON.parse(dataString);

    const creationDate = new Date().toISOString().split("T")[0];

    const newTask = {
      task: parsedData.task,
      description: parsedData.description,
      dueDate: parsedData.dueDate,
      creationDate: creationDate,
      priority: parsedData.priority,
      status: "In Progress",
    };

    tasks.push(newTask);

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(
      JSON.stringify({ message: "Task added successfully!", tasks })
    );
  });
};

// Handle updating a task
const handlePut = function (request, response) {
  let dataString = "";
  const taskIndex = parseInt(request.url.split("/")[2]);

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    const parsedData = JSON.parse(dataString);

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      task: parsedData.task,
      description: parsedData.description,
      dueDate: parsedData.dueDate,
      priority: parsedData.priority,
      status: "In Progress",
    };

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(
      JSON.stringify({ message: "Task updated successfully!", tasks })
    );
  });
};

// Handle marking a task as completed
const handleComplete = function (request, response) {
  const taskIndex = parseInt(request.url.split("/")[2]);

  tasks[taskIndex].status = "Completed"; // Mark the task as completed

  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ message: "Task marked as complete!", tasks }));
};

// Handle marking a completed task as "In Progress"
const handleInProgress = function (request, response) {
  const taskIndex = parseInt(request.url.split("/")[2]);

  tasks[taskIndex].status = "In Progress"; // Mark the task back as "In Progress"

  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(
    JSON.stringify({ message: "Task marked as In Progress!", tasks })
  );
};

// Handle deleting a task
const handleDelete = function (request, response) {
  const taskIndex = parseInt(request.url.split("/")[2]);
  tasks.splice(taskIndex, 1); // Remove the task at the given index

  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(
    JSON.stringify({ message: "Task deleted successfully!", tasks })
  );
};

const sendFile = function (response, filename, contentType) {
  fs.readFile(filename, function (err, content) {
    if (err) {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("404 Error: File Not Found");
    } else {
      response.writeHead(200, { "Content-Type": contentType });
      response.end(content);
    }
  });
};

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
