const http = require("http");
const fs   = require("fs");
const mime = require("mime");
const { isUndefined } = require("util");

// Local directory
const dir  = "public/";

// Server port
const port = 3000;

// Data table for active laptop loans
let activeLoans = 
[
  {"id": -1, "firstname": "placeholder", "lastname": "placeholder", "dup":false},

  {"id": 2, "firstname": "John", "lastname": "Yakuza", "dup":false},
  {"id": 9, "firstname": "Matthew", "lastname": "Stinson", "dup":false},
  {"id": 14, "firstname": "Jess", "lastname": "Stairs", "dup":false},
  {"id": 15, "firstname": "Austin", "lastname": "Murphy", "dup":false},
  {"id": 20, "firstname": "Astro", "lastname": "Bottington", "dup":false},
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

const deleteEntry = function(entry)
{
  console.log(entry.id);
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
    sendFile(response, `${dir}${file}`);
    break;
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
  const file = request.url.slice(1);

  switch (file)
  {
  case "submit":
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
      console.log(formatLog("POST", `Raw user input: ${userDataText}`));
  
      const dataID = parseInt(userData.id);
      if (isNaN(dataID) || dataID < 0)
      {
        response.writeHead(422, "Invalid ID", {"Content-Type": "text/plain"});
        response.end(`Error 422: Unprocessable Entity`);
      }
      else if (activeLoans.some(laptop => laptop.id === dataID))
      {
        response.writeHead(422, "Duplicate ID", {"Content-Type": "text/plain"});
        response.end(`Error 422: Unprocessable Entity`);
      }
      else
      {
        activeLoans.push({"id": parseInt(userData.id), "firstname": userData.firstname, "lastname": userData.lastname, "dup": false});
        
        activeLoans.sort(function(a, b)
        {
          return (a.id > b.id) ? 1 : -1;
        });

        checkForDups();

        response.writeHead(200, "OK", {"Content-Type": "text/plain"});
        response.end(`${userDataText}`);
      }
    });
    break;

  case "remove":

    let laptopData;
    request.on("data", function(data)
    {
      laptopData = JSON.parse(data);
    });

    request.on("end", function()
    {
      activeLoans = activeLoans.filter(laptop => laptop.id !== laptopData.id);

      activeLoans.sort(function(a, b)
      {
        return (a.id > b.id) ? 1 : -1;
      });
      
      checkForDups();

      response.writeHead(200, "OK", {"Content-Type": "text/plain"});
      response.end(`Removed laptop ${laptopData}`);
    });
    break;

  default:
    response.writeHead(400, "Unknown client request", {"Content-Type": "text/plain"});
    response.end(`Error 400: Bad Request`);
    break;
  }
}

const checkForDups = function()
{
  for (let baseRow = 1; baseRow < activeLoans.length - 1; baseRow++)
  {
    let result = false;
    for (let checkRow = 1; checkRow < activeLoans.length - 1; checkRow++)
    {
      if (baseRow !== checkRow)
      {
        result |= (activeLoans[baseRow].firstname === activeLoans[checkRow].firstname &&
                   activeLoans[baseRow].lastname === activeLoans[checkRow].lastname);
      }
    }

    activeLoans[baseRow].dup = (result === 1) ? true : false;
  }
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
