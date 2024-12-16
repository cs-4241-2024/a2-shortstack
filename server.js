const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let appdata = [
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
]

const calculateYearsOld = function (cars) {
  const currentYear = new Date().getFullYear();
  cars.forEach(car => {
    car.yearsOld = 2024 - car.year; 
  });
};

calculateYearsOld(appdata);

const server = http.createServer(function (request, response) {
  if (request.method === 'GET') {
    handleGet(request, response)
  } else if (request.method === 'POST') {
    handlePost(request, response)
  } else if (request.method === 'DELETE') {
    handleDelete(request, response)
  }
})

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1)
  if (request.url === '/') {
    sendFile(response, 'public/index.html')
  }
  else if (request.url === '/data') {
    response.writeHeader(200, { "Content-type": "application/json" });
    response.end(JSON.stringify(appdata));
  }
  else {
    sendFile(response, filename)
  }
}
const handlePost = function (request, response) {
  console.log("request URL" + request.url);
  let dataString = ''
  request.on('data', function (data) {
    dataString += data;
  })
  request.on('end', function () {
    console.log('Data received:', dataString);
    let postResponse = JSON.parse(dataString);
    console.log('Data received:', postResponse.year);
    const yearsOld = 2024 - postResponse.year;
    appdata.push({
      model: postResponse.model,
      year: postResponse.year,
      mpg: postResponse.mpg,
      yearsOld: yearsOld
    });

    response.writeHead(200, "OK", { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(appdata));
  });
};

const handleDelete = function (request, response) {
  let dataString = ''
  request.on('data', function (data) {
    dataString += data
  })
  request.on('end', function () {
    let modelToRemove = JSON.parse(dataString).modelToRemove
    appdata = appdata.filter(function (car) {
      return car.model !== modelToRemove;
    })
    response.writeHead(200, "OK", { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(appdata))
  })
}

const sendFile = function (response, filename) {
  const type = mime.getType(filename)
  console.log('Requested file:', filename);

  fs.readFile(filename, function (err, content) {

    if (err === null) {
      response.writeHeader(200, { 'Content-Type': type })
      response.end(content)
    } else {
      response.writeHeader(404)
      response.end('404 Error: File Not Found')
    }
  })
}

server.listen(process.env.PORT || port)