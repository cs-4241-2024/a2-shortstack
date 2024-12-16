const http = require( 'http' ),
    fs   = require( 'fs' ),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library if you're testing this on your local machine.
    // However, Glitch will install it automatically by looking in your package.json
    // file.
    mime = require( 'mime' ),
    dir  = 'public/',
    port = 3000

let appdata =  [
  { 'name': 'Piper', 'cookie':'chocolate chip', 'icecream': 'vanilla', 'other':'', 'cake':'vanilla cake'},
  { 'name': 'James', 'cookie':'oatmeal no raisin', 'icecream': 'chocolate', 'other':'', 'cake':'chocolate cake'},
  { 'name': 'Sky', 'cookie':'sugar', 'icecream': 'vanilla', 'other':'', 'cake':'vanilla cake'}
]

const server = http.createServer( function (request, response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )
  }else if( request.method === 'POST' ){
    handlePost( request, response )
  }
})


const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 )
  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else if (request.url === '/data'){
    response.end(JSON.stringify(appdata))
  }
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  //console.log(appdata)
  request.on( 'data', function( data ) {
    console.log(data)
    dataString += data
  })
  request.on( 'end', function() {
    //console.log( JSON.parse( dataString ) )
    const data = JSON.parse(dataString)
    const tempDict = {'name':data[0], 'cookie':data[1], 'icecream':data[2], 'other':data[3], 'cake':data[4]}
    appdata = appdata.concat(tempDict)
    //appdata.push(tempDict)

    //const data = JSON.parse( dataString )
    // ... do something with the data here!!!
    //appdata.push(response)
    //appdata.push(data)
    //appdata = appdata + response

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(data))
  })
}

const sendFile = function( response, filename ) {
  const type = mime.getType( filename )

  fs.readFile( filename, function( err, content ) {

    // if the error = null, then we've loaded the file successfully
    if( err === null ) {

      // status code: https://httpstatuses.com
      response.writeHeader( 200, { 'Content-Type': type })
      response.end( content )

    }else{

      // file not found, error code 404
      response.writeHeader( 404 )
      response.end( '404 Error: File Not Found' )

    }
  })
}

server.listen( process.env.PORT || port )