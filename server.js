const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
        //{ 'type': 'green', 'day': 'sunday', 'rating': '8', 'meaning': 'very good! will drink often!' },
      ]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }else if(request.method === 'DELETE'){
    handleDelete(request, response)
  }else if(request.method === 'PATCH') {
    handlePatch(request, response)
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

const deriveField = function(dataParse) {
  //logic for determining meaning from the rating
  let meaning = 'default'
  if (dataParse.rating <= 2) {
    meaning = 'BAD, do not drink again'
  } else if (dataParse.rating > 2 && dataParse.rating <5) {
    meaning = 'not very good, probably will not drink again'
  } else if (dataParse.rating >= 5 && dataParse.rating <=7) {
    meaning = 'pretty averge, maybe drink once in a while'
  } else if (dataParse.rating > 7 && dataParse.rating <=9) {
    meaning = 'very good! will drink often!'
  } else if (dataParse.rating == 10) {
    meaning = 'my favorite!!'
  } else {
    meaning = 'rating does not compute'
  }
  return meaning;
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    
    dataParse = JSON.parse( dataString )

    const meaning = deriveField(dataParse)
    dataParse.meaning = meaning;
    appdata.push(dataParse)

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end( JSON.stringify (appdata))
  })
}

const handleDelete = function(request, response) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    
    dataParse = JSON.parse( dataString )

    if (dataParse.row-1 < 0 || dataParse.row-1 > appdata.length) {
      console.log("Row doesn't exist. Please enter a valid row number")
    } else {
      appdata.splice(dataParse.row-1, 1);
      console.log("APPDATA", appdata)
    }

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end( JSON.stringify (appdata))
  })
}

const handlePatch = function(request, response) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    
    dataParse = JSON.parse( dataString )

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
