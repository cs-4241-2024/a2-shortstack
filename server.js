const http = require('http'),
      fs = require('fs'),
      mime = require('mime'),
      dir = 'public/',
      port = 3000;


let globalCashTotal = 0;
let globalCumulativeItemTotal = 0;
const appdata = [];


const server = http.createServer(function (request, response) {
  if (request.method === 'GET') {
    handleGet(request, response);
  } else if (request.method === 'POST') {
    handlePost(request, response);
  }
});

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === '/') {
    sendFile(response, 'public/index.html');
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function (request, response) {
  let dataString = '';

  request.on('data', function (data) {
    dataString += data;
  });

  request.on('end', function () {
    const receivedData = JSON.parse(dataString);
    console.log(receivedData);
    
    if(receivedData.action == "addToCart") {
      const {orderNumber, name, address, phone, instructions, taxPrice, totalPrice, cashTotal, itemTotal} = receivedData;
      
      globalCashTotal = cashTotal;
      globalCumulativeItemTotal = itemTotal;

      appdata.push({orderNumber, name, address, phone, instructions, taxPrice, totalPrice, cashTotal, itemTotal});
      response.writeHead(200, "OK", {'Content-Type': 'application/json'});
      response.end(JSON.stringify({cart: appdata}))

    } else if (receivedData.action == "getCart") {
      response.writeHead(200, "OK", {'Content-Type': 'application/json'});
      response.end(JSON.stringify({
        cart: appdata,
        cashTotal: globalCashTotal,
        cumulativeItemTotal: globalCumulativeItemTotal
      }));
    }

    // appdata.push(receivedData);

    console.log('Updated appdata:', appdata);

    // response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
    // response.end('Data received and processed');
  });
};

const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
    if (err === null) {
      response.writeHeader(200, { 'Content-Type': type });
      response.end(content);
    } else {
      response.writeHeader(404);
      response.end('404 Error: File Not Found');
    }
  });
};

server.listen(process.env.PORT || port);