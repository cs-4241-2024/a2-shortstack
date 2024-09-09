const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library if you're testing this on your local machine.
  // However, Glitch will install it automatically by looking in your package.json
  // file.
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const appdata = [];

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  } else if (request.method == "DELETE") {
    handleDel(request, response);
  }
});

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else {
    sendFile(response, filename);
  }
};

const handleDel = function (request, response) {
  let string = "";
  request.on("data", function (data) {
    string += data;
  });

  request.on("end", function () {
    const data = JSON.parse(string);

    appdata.splice(data, 1);

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(JSON.stringify(appdata));
  });
};

const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    // obj
    const data = JSON.parse(dataString);

    // check priority
    if (data.priority === "High") {
      let newDate = data.creationDate + 1;
      if (newDate === 7) {
        newDate = 0;
      }

      data.creationDate = newDate;
    } else if (data.priority === "Medium") {
      let i = 0;
      for (i = 0; i < 3; i++) {
        let newDate = data.creationDate + 1;
        if (newDate === 7) {
          newDate = 0;
        }
        data.creationDate = newDate;
      }
    } else if (data.priority === "Low") {
      let j = 0;
      for (j = 0; j < 7; j++) {
        let newDate = data.creationDate + 1;
        if (newDate === 7) {
          newDate = 0;
        }
        data.creationDate = newDate;
      }
    }

    switch (data.creationDate) {
      case 0:
        data.creationDate = "Sunday";
        break;
      case 1:
        data.creationDate = "Monday";
        break;
      case 2:
        data.creationDate = "Tuesday";
        break;
      case 3:
        data.creationDate = "Wednesday";
        break;
      case 4:
        data.creationDate = "Thursday";
        break;
      case 5:
        data.creationDate = "Friday";
        break;
      case 6:
        data.creationDate = "Saturday";
    }

    appdata.push(data);

    console.log(JSON.parse(dataString));

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(JSON.stringify(appdata));
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

server.listen(process.env.PORT || port);
