const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 4001

const appdata = [
  { 'name': 'Lisa', 'score': 1000, 'rank': 1},
  { 'name': 'John', 'score': 100, 'rank':2},
  { 'name': 'Jacob', 'score': 5, 'rank': 3},
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

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if (request.url === '/data') {
    response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
    response.end(JSON.stringify(appdata))
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )
    const data = JSON.parse(dataString);
    let updated = false;
    for (var i = 0; i < appdata.length; i++) {
      if (data.name === appdata[i].name) {
        appdata[i].score = data.score;
        updated = true;
      }     
    }
    if (!updated) {
        console.log("name " + data.name);
        appdata.push({'name':data.name, 'score':data.score, 'rank':0})
    }

    appdata.sort(function(a, b) {return b.score - a.score});
    console.log("data: " + JSON.stringify(appdata));

    for (var i = 0; i < appdata.length; i++) {
      appdata[i].rank = i+1;
    }
    
    // ... do something with the data here!!!

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata))
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
