const http = require('http'),
  fs = require('fs'),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library if you're testing this on your local machine.
  // However, Glitch will install it automatically by looking in your package.json
  // file.
  mime = require('mime'),
  dir = 'public/',
  port = 3000


const appdata = []
let currentTotal = 0;

const server = http.createServer(function (request, response) {
  if (request.method === 'GET') {
    handleGet(request, response)
  } else if (request.method === 'POST') {
    handlePost(request, response)
  }
})

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1)

  if (request.url === '/') {
    sendFile(response, 'public/index.html')
  }
  else if (request.url === '/data') {
    response.end(JSON.stringify(appdata))
  } else {
    sendFile(response, filename)
  }
}

const handlePost = function (request, response) {
  let dataString = ''

  request.on('data', function (data) {
    dataString += data
  })

  request.on('end', function () {
    if (request.url === "/submit") {
      let responce = JSON.parse(dataString);
      if (responce[responce.length - 1].lastnum == "Add" || responce[responce.length - 1].lastnum == "Sub"
        || responce[responce.length - 1].lastnum == "Mult" || responce[responce.length - 1].lastnum == "Div") {
        if (responce[responce.length - 1].lastnum == "Add") {
          currentTotal = Number(responce[responce.length - 1].firstnum) + currentTotal;
        }
        if (responce[responce.length - 1].lastnum == "Sub") {
          currentTotal = currentTotal - Number(responce[responce.length - 1].firstnum);
        }
        if (responce[responce.length - 1].lastnum == "Mult") {
          currentTotal = Number(responce[responce.length - 1].firstnum) * currentTotal;
        }
        if (responce[responce.length - 1].lastnum == "Div") {
          currentTotal = currentTotal / (responce[responce.length - 1].firstnum);
        }
        appdata.push({ 'firstnum': responce[responce.length - 1].firstnum, 'lastnum': responce[responce.length - 1].lastnum, 'total': currentTotal });
      }
    }
    else if(request.url === "/kill")
    {
      if(appdata.length != 0)
        {
            console.log(currentTotal);
            appdata.pop();
            currentTotal = appdata[appdata.length-1].total;
            //how do you just make current total the one in the data before it?
            console.log(currentTotal);
        }
    }
    response.writeHead(200, "OK", { 'Content-ype': 'text/plain' })
    response.end(JSON.stringify(appdata))
  })
}

const sendFile = function (response, filename) {
  const type = mime.getType(filename)

  fs.readFile(filename, function (err, content) {

    // if the error = null, then we've loaded the file successfully
    if (err === null) {

      // status code: https://httpstatuses.com
      response.writeHeader(200, { 'Content-Type': type })
      response.end(content)

    } else {

      // file not found, error code 404
      response.writeHeader(404)
      response.end('404 Error: File Not Found')

    }
  })
}

/*
window.onload = function(){
  fetch('/data')
}*/
server.listen(process.env.PORT || port)