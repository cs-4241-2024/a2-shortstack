const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let moods = []

const generateId = () => {
  if (moods.length === 0) return 1;
  return Math.max(...moods.map(m => m.id || 0)) + 1; // default to 0 if id is missing
}

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response );    
  }else if( request.method === 'POST'){
    handlePost( request, response );
  } else if(request.method === 'DELETE'){
    handleDelete(request, response);
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' || request.url === '/index.html') {
    sendFile( response, 'public/index.html' );
  }else if (request.url === '/results'){
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(moods));
  } else {
    sendFile( response, filename );
  }
}

const handlePost = function( request, response ) {
  let dataString = '';

  request.on( 'data', function( data ) {
      dataString += data;
  })

  request.on( 'end', () => {
    // console.log( JSON.parse( dataString ));

    const newMood = JSON.parse(dataString);


    //console.log("Mood before pushing is ", newMood);
    newMood.id = generateId();
    newMood.timestamp = new Date().toISOString();
    newMood.moodScore = calculateMoodScore(newMood.mood);

    moods.push(newMood);

    //console.log("New mood is: ", newMood);
    // ... do something with the data here!!!

    //console.log("Moods now are : ", moods);

    response.writeHead( 200, {'Content-Type': 'application/json' });
    response.end(JSON.stringify(moods));
  })
}

const handleDelete = (request, response) => {
  const id = parseInt(request.url.split('/')[2], 10);
  moods = moods.filter(mood => mood.id !== id);

  response.writeHead(200, {'Content-Type': 'application/json'});
  response.end(JSON.stringify(moods));
}

const calculateMoodScore = (mood) => {
  switch (mood) {
    case 'happy' : return 8;
    case 'sad' : return 3;
    case 'angry': return 2;
    case 'excited': return 7;
    default : return 5;
  }
};

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, ( err, content ) => {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHead( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHead( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )
