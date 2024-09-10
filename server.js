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
  {"task":"Quiz", "priority":"Low", "creationdate":"09/02/2024", "duedate":"09/19/2024", "dueTime" : "0"},
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
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function(request, response) {
  let dataString = '';

  request.on('data', function(data) {
    dataString += data;
  });

  request.on('end', function() {
    if (request.url === "/submit") {
      // Handle task submission
      let dataJson = JSON.parse(dataString);
      appdata.push(dataJson); // Add task to appdata
      console.log('After submit:', appdata);
    } else if (request.url === "/delete") {
      // Handle task deletion
      let dataJson = JSON.parse(dataString);
      let taskToDelete = dataJson.task;
      appdata = appdata.filter(item => item.task !== taskToDelete); // Remove task
      console.log('After delete:', appdata);
    }

    // Send response with the (now empty) appdata
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(appdata));
  });
};


function calculateDaysLeft(dueDay) {
  let currentDate = new Date();
  let dueDate = new Date(dueDay);
  let timeDiff = dueDate.getTime() - currentDate.getTime();
  let daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysLeft > 0 ? daysLeft : 0;  // Return 0 if the due date has passed
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
