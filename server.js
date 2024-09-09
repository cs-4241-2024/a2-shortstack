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
  ['a','a','a'], 
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 
  console.log(request.url)
  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else if( request.url === '/api/table') {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify({'table': appdata}));
  }
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  if( request.url === '/api/saveTable'){
    let dataString = '';
    request.on( 'data', function( data ) {
      dataString += data;
    })
    request.on( 'end', function() {
      console.log('a')
      console.log(dataString)
      appdata = JSON.parse(dataString).table
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Table data saved successfully' }));
    })
  }
  else{
    response.writeHead(400, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: 'Failure' }));
  }
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
