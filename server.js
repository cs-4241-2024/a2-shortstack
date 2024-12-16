const http = require("http"),
    fs = require("fs"),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library if you're testing this on your local machine.
    // However, Glitch will install it automatically by looking in your package.json
    // file.
    mime = require("mime"),
    dir = "public/",
    port = 3000;

let appdata = [
  {
    date: "10/18/2002",
    month: "October",
    day: 18,
    year: 2002,
    age: 21,
    dayOfWeek: "Friday",
  },
  {
    date: "01/18/2001",
    month: "January",
    day: 18,
    year: 2001,
    age: 23,
    dayOfWeek: "Thursday",
  },
];

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
  } else if (request.url === "/data") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(appdata));
  } else if (request.url === "/ages") {
    if (appdata.length === 0) {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ oldest: null, youngest: null }));
      return;
    }
    const ages = appdata.map((item) => item.age);
    const oldest = Math.max(...ages);
    const youngest = Math.min(...ages);
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ oldest, youngest }));
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function (request, response) {
  let body = "";

  request.on("data", function (chunk) {
    body += chunk;
  });

  request.on("end", function () {
    const json = JSON.parse(body);

    const dateValue = json.yourdate;
    const dateParts = dateValue.split("/");

    if (dateParts.length === 3) {
      const month = parseInt(dateParts[0], 10);
      const day = parseInt(dateParts[1], 10);
      const year = parseInt(dateParts[2], 10);

      const dateObj = new Date(year, month - 1, day);
      const now = new Date();
      let age = now.getFullYear() - dateObj.getFullYear();

      if (
          now.getMonth() + 1 < month ||
          (now.getMonth() + 1 === month && now.getDate() < day)
      ) {
        age--;
      }

      const options = { weekday: "long" };
      const dayOfWeek = dateObj.toLocaleDateString("en-US", options);

      appdata.push({
        date: dateValue,
        month: dateObj.toLocaleDateString("en-US", { month: "long" }),
        day: day,
        year: year,
        age: age,
        dayOfWeek: dayOfWeek,
      });

      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(appdata));
    } else {
      response.writeHead(400, { "Content-Type": "text/plain" });
      response.end("Invalid date format");
    }
  });
};

const handleDelete = function (request, response) {
  let body = "";

  request.on("data", function (chunk) {
    body += chunk;
  });

  request.on("end", function () {
    const json = JSON.parse(body);
    const index = json.index;

    if (index >= 0 && index < appdata.length) {
      appdata.splice(index, 1);
    }

    response.writeHead(200, { "Content-Type": "application/json" });
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

server.listen(port, function () {
  console.log(`Server running at http://localhost:${port}/`);
});
