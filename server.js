const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const highscoreFile = 'highscores.json';

let highscore = [];
if (fs.existsSync(highscoreFile)) {
  highscore = JSON.parse(fs.readFileSync(highscoreFile));
}

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
  } else if (request.url === '/highscores') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(highscore));
  }
  else{
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

    const newHighscore = JSON.parse(dataString);
      let isNewHighscore = true;
    highscore = highscore.filter(entry => {
      if (entry.name === newHighscore.name) {
        if (newHighscore.time < entry.time) {
          return false;
        }
        isNewHighscore = false;
        return true;
      }
      return true;
    });
    if (isNewHighscore) {
      highscore.push(newHighscore);
      highscore.sort((a, b) => a.time - b.time); // Sort highscore list
      fs.writeFileSync(highscoreFile, JSON.stringify(highscore)); // Save to file
    }

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Highscore updated');
  });
};

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {
      response.writeHead(200, { 'Content-Type': type });
      response.end(content);
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
