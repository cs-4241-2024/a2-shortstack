const http = require('http'),
      fs = require('fs'),
      mime = require('mime'),
      dir = 'public/',
      port = 3000

  const appdata = [
    { 'employeeid': '123456789', 'name': 'John Doe', 'salary': 50000, 'regdate': 2018, 'expdate': 2023 },
    { 'employeeid': '678054721', 'name': 'Jack Smith', 'salary': 67000, 'regdate': 2015, 'expdate': 2020 },
    { 'employeeid': '987604321', 'name': 'John Doe', 'salary': 50000, 'regdate': 2020, 'expdate': 2025 } 
  ]

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
  } else if (request.url === '/data') {
    response.writeHead(200, { 'Content-Type': 'application/json' })
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
    const newData = JSON.parse(dataString)

    const newEntry = {
      employeeid: newData.employeeid,
      name: newData.yourname,
      salary: newData.salary,
      regdate: newData.regdate,
      expdate: parseInt(newData.regdate) + 5 
    }

    appdata.push(newEntry)

    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(appdata))
  })
}

const sendFile = function (response, filename) {
  const type = mime.getType(filename)

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
