const http = require("http"),
  fs = require("fs"),
  mime = require("mime"),
  dir = "public/",
  port = 3000;

let tasks = []; // In-memory storage for tasks

// Creating the HTTP server to handle requests
const server = http.createServer((request, response) => {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

// Handle GET requests - serves the main HTML file and responds with task data
const handleGet = (request, response) => {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else if (request.url === "/tasks") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(tasks));
  } else {
    sendFile(response, filename);
  }
};

// Handle POST requests - processes adding, deleting, and editing tasks
const handlePost = (request, response) => {
  let dataString = "";

  request.on("data", (data) => {
    dataString += data;
  });

  request.on("end", () => {
    const receivedData = JSON.parse(dataString);

    // Adding a new task
    if (request.url === "/add") {
      const creationDate = new Date().toISOString().split("T")[0];
      const deadline = calculateDeadline(creationDate, receivedData.priority);
      const newTask = {
        task: receivedData.task,
        priority: receivedData.priority,
        creation_date: creationDate,
        deadline: deadline,
      };
      tasks.push(newTask);
      response.writeHead(200, "OK", { "Content-Type": "text/plain" });
      response.end("Task added successfully");

    // Deleting a task
    } else if (request.url === "/delete") {
      const index = receivedData.index;
      tasks.splice(index, 1);
      response.writeHead(200, "OK", { "Content-Type": "text/plain" });
      response.end("Task deleted successfully");

    // Editing an existing task
    } else if (request.url === "/edit") {
      const index = receivedData.index;
      // Update the task's description, priority, and recalculate the deadline
      tasks[index].task = receivedData.task;
      tasks[index].priority = receivedData.priority;
      tasks[index].deadline = calculateDeadline(tasks[index].creation_date, receivedData.priority);
      response.writeHead(200, "OK", { "Content-Type": "text/plain" });
      response.end("Task edited successfully");
    }
  });
};

// Function to calculate the deadline based on priority
const calculateDeadline = (creationDate, priority) => {
  const date = new Date(creationDate);
  date.setDate(date.getDate() + (priority === "High" ? 1 : 3));
  return date.toISOString().split("T")[0];
};

// Function to read and serve files from the system
const sendFile = (response, filename) => {
  const type = mime.getType(filename);

  fs.readFile(filename, (err, content) => {
    if (err === null) {
      response.writeHead(200, { "Content-Type": type });
      response.end(content);
    } else {
      response.writeHead(404);
      response.end("404 Error: File Not Found");
    }
  });
};

// Start the server
server.listen(process.env.PORT || port);
