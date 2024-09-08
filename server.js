const http = require("http");
const fs   = require("fs");
const mime = require("mime");

// Local directory
const dir  = "public/";

// Server port
const port = 3000;

// Data table for active laptop loans
const activeLoans = 
[
  {"id": 0, "firstname": "test-first0", "lastname": "test-last0"},
  {"id": 1, "firstname": "test-first1", "lastname": "test-last1"},
  {"id": 2, "firstname": "test-first2", "lastname": "test-last2"},
  {"id": 3, "firstname": "test-first3", "lastname": "test-last3"},
]

/**
 * Formats a log message to include message source.
 * 
 * @param {string} src Message source.
 * @param {string} message Base log message.
 * @returns Formatted log message.
 */
const formatLog = function(src, message)
{
  return `[${src.toUpperCase()}] → ${message}`;
}

/**
 * Creates a server object and binds GET and POST requests to functions.
 * Any other requests will go unhandled and print an error.
 */
const server = http.createServer(function(request ,response)
{
  switch (request.method)
  {
  case "GET":
    handleGet(request, response);
    break;

  case "POST":
    handlePost(request, response);
    break;

  default:
    console.log(formatLog("SERVER", `Unhandled request type ${request.method}`));
    break;
  }
});

/**
 * Handles an incoming GET request.
 * 
 * @param {*} request Request object.
 * @param {*} response Response object.
 */
const handleGet = function(request, response)
{
  const file = request.url.slice(1);

  switch (file)
  {
  case "":
    sendFile(response, `${dir}/index.html`);
    break;

  case "table":
    response.writeHeader(200, {"Content-Type": "application/json"});
    response.end(JSON.stringify(activeLoans));
    break;

  default:
    sendFile(response, `${dir}${file}`)
  }
}

/**
 * Handles an incoming POST request.
 * 
 * @param {*} request Request object.
 * @param {*} response Response object.
 */
const handlePost = function(request, response)
{
  let dataString;

  // Get data from request
  request.on("data", function(data)
  {
    dataString = data;
  });

  // Process data from request
  request.on("end", function()
  {
    const userData = JSON.parse(dataString);
    const userDataText = `[ID: ${userData.id}, First Name: ${userData.firstname}, Last Name: ${userData.lastname}]`;
    console.log(formatLog("POST", `Unprocessed user input: ${userDataText}`));

    const dataID = parseInt(userData.id);
    if (isNaN(dataID) && dataID >= 0)
    {
      response.writeHead(422, "Invalid ID", {"Content-Type": "text/plain"});
      response.end(`Error 422: Unprocessable Entity`);
    }
    else
    {
      // TODO: Check if ID already exists!
      // TODO: General error handling of new data (ex: positive integers only)
      // TODO: Even though negative numbers get err 422, they still appear in table!
      activeLoans.push({"id": userData.id, "firstname": userData.firstname, "lastname": userData.lastname});

      response.writeHead(200, "OK", {"Content-Type": "text/plain"});
      response.end(`${userDataText}`);
    }
  });
}

/**
 * Given a file path, finds an HTML page to display to the user. Error 404 if not found.
 * 
 * @param {*} response Response object.
 * @param {string} filename Local file path.
 */
const sendFile = function(response, filename)
{
  fs.readFile(filename, function(error, content)
  {
    // Check for error finding file
    if (error === null)
    {
      // Status code reference: https://httpstatuses.com
      response.writeHeader(200, {"Content-Type": mime.getType(filename)});
      response.end(content);
    }
    else
    {
      // File not found :(
      response.writeHeader(404);
      response.end("Error 404: File Not Found");
    }
  });
}

// Start server on port
server.listen( process.env.PORT || port )
console.log(formatLog("SERVER", `Server running on port ${port}`))
