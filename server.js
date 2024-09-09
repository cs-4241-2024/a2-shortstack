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

  // Example loans
  {"id": 2, "firstname": "John", "lastname": "Smith", "dup":false},
  {"id": 9, "firstname": "Matthew", "lastname": "Stinson", "dup":false},
  {"id": 14, "firstname": "Jess", "lastname": "Stairs", "dup":false},
  {"id": 15, "firstname": "Austin", "lastname": "Murphy", "dup":false},
  {"id": 20, "firstname": "matthew", "lastname": "stinson", "dup":false},
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

  // Client requests data from active loans table
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
      // Parse user data
      const userData = JSON.parse(dataString);
      const userDataText = `[ID: ${userData.id}, First Name: ${userData.firstname}, Last Name: ${userData.lastname}]`;
      
      // DEBUG: Log raw user input
      // console.log(formatLog("POST", `Raw user input: ${userDataText}`));
  
      // Check if input ID is a positive integer (rounds decimals down)
      const dataID = parseInt(userData.id);
      if (isNaN(dataID) || dataID < 0)
      {
        response.writeHead(422, "Invalid ID", {"Content-Type": "text/plain"});
        response.end(`Error 422: Unprocessable Entity`);
      }

      // Check for duplicate ID
      else if (activeLoans.some(laptop => laptop.id === dataID))
      {
        response.writeHead(422, "Duplicate ID", {"Content-Type": "text/plain"});
        response.end(`Error 422: Unprocessable Entity`);
      }

      // Data is good!
      else
      {
        // Add data to active loans table
        activeLoans.push({"id": parseInt(userData.id), "firstname": userData.firstname, "lastname": userData.lastname, "dup": false});
        
        // Sort data by ID
        activeLoans.sort(function(a, b)
        {
          return (a.id > b.id) ? 1 : -1;
        });

        // Check for duplicate names (allowed, but flagged)
        checkForDups();

        // Send response
        response.writeHead(200, "OK", {"Content-Type": "text/plain"});
        response.end(`${userDataText}`);
      }
    });
    break;

  case "remove":
    let laptopData;

    // Get data from request
    request.on("data", function(data)
    {
      // Parse user data
      laptopData = JSON.parse(data);
    });

    // Get data from request
    request.on("end", function()
    {
      // Remove requested entry
      activeLoans = activeLoans.filter(laptop => laptop.id !== laptopData.id);

      // Sort remaining entries
      activeLoans.sort(function(a, b)
      {
        return (a.id > b.id) ? 1 : -1;
      });
      
      // Check for duplicate names (allowed, but flagged)
      checkForDups();

      // Send response
      response.writeHead(200, "OK", {"Content-Type": "text/plain"});
      response.end(`Removed laptop ${laptopData}`);
    });
    break;

  // Unknown POST request
  default:
    response.writeHead(400, "Unknown client request", {"Content-Type": "text/plain"});
    response.end(`Error 400: Bad Request`);
    break;
  }
}

/**
 * Modifies table, flagging all duplicate names (first AND last must match).
 */
const checkForDups = function()
{
  // For each row...
  for (let baseRow = 1; baseRow < activeLoans.length; baseRow++)
  {
    // Check all other rows...
    let result = false;
    for (let checkRow = 1; checkRow < activeLoans.length; checkRow++)
    {
      if (baseRow !== checkRow)
      {
        // And mark true if a name is a perfect match
        result |= (activeLoans[baseRow].firstname.toLowerCase() === activeLoans[checkRow].firstname.toLowerCase() &&
                   activeLoans[baseRow].lastname.toLowerCase() === activeLoans[checkRow].lastname.toLowerCase());
      }
    }

    // Save result in base row
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

// Quick duplicates check in table
checkForDups();

// Start server on port
server.listen( process.env.PORT || port )
console.log(formatLog("SERVER", `Server running on port ${port}`))
