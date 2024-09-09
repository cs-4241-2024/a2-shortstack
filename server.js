const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

    // Characters from musicals
      // name, musical name, song #
      // derived: "position", if song > 3, character is a "lead" 
      // if song 1-2 "secondary" / songs 0 "ensemble"




const appdata = []



const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  } else if ( request.method === 'DELETE' ){
    handleDelete ( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
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
    const data = JSON.parse( dataString )
    
    appdata.push(data);
    console.log(appdata);    
  
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end( JSON.stringify( appdata ) )
  })
}

// new handle, for deletion: very similar to the others!

const handleDelete = function(request, response) {
  let dataString = '';

  request.on('data', function(data) {
    dataString += data;
  });

  request.on('end', function() {

      const data = JSON.parse(dataString);
      const { name } = data;

      // Find delete index
      const indexNum = appdata.findIndex(item => item.name === name);

    // if the index exists, delete it
      if (indexNum !== -1) {
        appdata.splice(indexNum, 1);
        
        console.log("Current array:");
        console.log(appdata);
        
        // same as handleget
        response.writeHead(200, "OK", {'Content-Type': 'application/json'});
        response.end(JSON.stringify(appdata));
      } 
  } 
)};
       

    
    
    
    

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
