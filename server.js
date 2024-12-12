const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [];

const calculateForce = function(radius, depth, fluid) {

  let fluidDensity = fluid === 'water' ? 1000 : 850; // water: 1000 kg/m³, oil: ~850 kg/m³
  
  // pressure calculation based on radius, depth, and fluid type (P = ρgh)
  const pressure = fluidDensity * 9.81 * depth;

  // surface area of ball in m
  const area = 4 * Math.PI * radius * radius / 10000;

  return pressure * area;
};

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

  // Collect data from the incoming request
  request.on('data', function(data) {
    dataString += data;
  });

  request.on('end', function() {
    const data = JSON.parse(dataString);

    // unpack data from the request (radius, depth, fluid)
    const { radius, depth, fluid } = data;

    const force = calculateForce(radius, depth, fluid);

    // update appdata
    appdata.push({
      radius: radius,
      depth: depth,
      fluid: fluid,
      force: force
    });

    // return appdata array to client
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(appdata[appdata.length-1]));
  });
};

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
