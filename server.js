const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library if you're testing this on your local machine.
  // However, Glitch will install it automatically by looking in your package.json
  // file.
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const password = "Password";

const previous_attempts = [];

function Attempt(correct, password_entry, num_correct_letters, correct_length) {
  this.correct = correct;
  this.password_entry = password_entry;
  this.num_correct_letters = num_correct_letters;
  this.correct_length = correct_length;
}

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
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

const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    const obj = JSON.parse(dataString);
    console.log(obj.password_entry);

    //... do something with the data here!!!
    if(obj.password_entry == password)
    { 
      
      //correct?, password_entry, num_correct_letters, correct_lenght
      const new_attempt = new Attempt("true", obj.password_entry, password.length, "yes");
      previous_attempts.push(new_attempt);
      
      //response.writeHead(200, "OK", { "Content-Type": "text/plain" });
      response.writeHead(200, "OK", { "Content-Type": "application/json" });
      
      response.end(JSON.stringify(previous_attempts));
    }
    else
    {
      let correct_length = "yes"
      let num_correct_letters = 0;
      
      if(obj.password_entry.length > password.length)
      {
        correct_length = "too_long";
      }
      else if(obj.password_entry.length < password.length)
      {
        correct_length = "too_short";
      }
      
      if(correct_length == "yes" || "too_short")
      {
        for(let i = 0; i < obj.password_entry.length; i++)
        {
          if(obj.password_entry.charAt(i) == password.charAt(i))
          {
            num_correct_letters++;
          }
        }
      }
      else
      {
        for(let i = 0; i < password.length; i++)
        {
          if(obj.password_entry.charAt(i) == password.charAt(i))
          {
            num_correct_letters++;
          }
        }
      }
      //correct?, password_entry, num_correct_letters, correct_length
      const new_attempt = new Attempt("false", obj.password_entry, num_correct_letters, correct_length);
      previous_attempts.push(new_attempt);
    
      response.writeHead(200, "OK", { "Content-Type": "application/json" });
      response.end(JSON.stringify(previous_attempts));
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

server.listen(process.env.PORT || port);
