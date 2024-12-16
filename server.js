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
  { 'name': 'Sophia', 'date': "2024-09-09", 'points': "900" , 'rank' : 2},
  { 'name': 'Boulder', 'date': "2024-09-08", 'points': "700", 'rank': 3 },
  { 'name': 'Pebbles', 'date': "2024-08-07", 'points': "999", 'rank' : 1}
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
  } else if ( request.url === '/getall' ) {
    sortRank(appdata)
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
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
    console.log(dataString)


    appdata = appdata.concat(JSON.parse(dataString))

    sortRank(appdata)
    console.log(appdata)

    console.log(appdata)
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(dataString)
  })
}
const sortRank = function (){
  appdata = appdata.sort(function (a, b) {
    let pointa = parseInt(a.points)
    let pointb = parseInt(b.points)
    if (pointa > pointb) return -1;
    else if (pointa == pointb) {
      if (a.date < b.date) return -1;
      else return 1;
    }
    else return 1;
  })
  for (let i = 1 ; i <= appdata.length; i++){
    appdata[i-1] = {... appdata[i-1] , rank: i}
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
