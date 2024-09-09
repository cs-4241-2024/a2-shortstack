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
  { 'name': 'Andrew Cash', 'email': 'arcash@wpi.edu', 'phone': '7742496633', 'age': '21', 'grade': 'Senior'},
  { 'name': 'Joe Michale', 'email': 'jmichael@wpi.edu', 'phone': '5082358865', 'age': '20', 'grade': 'Junior'},
  { 'name': 'Jake Del', 'email': 'jdel@wpu.edu', 'phone': '8176789900', 'age': '19', 'grade': 'Sophmore'} 
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
  }
  // End point to send data
  else if(request.url === '/data'){
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end(JSON.stringify(appdata))
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
      if(request.url === '/submit') {
        const data = JSON.parse(dataString)
        let str = data.str
      
        let data_json = {}
        const data_array = str.split(',')
        for (let i = 0; i < data_array.length; i++){
          if (i === 0) {
            data_json.name = data_array[i]
          }
          else if (i === 1) {
            data_json.email = data_array[i]
          }
          else if (i === 2){
            data_json.phone = data_array[i]
          }
          else if (i === 3){
            data_json.age = data_array[i]
            // Dynamic attribute
            if (parseInt(data_array[i]) < 19)
              data_json.grade = 'Freshman'
            else if (parseInt(data_array[i]) < 20)
              data_json.grade = 'Sophomore'
            else if (parseInt(data_array[i]) < 21)
              data_json.grade = 'Junior'
            else {
              data_json.grade = 'Senior'
            }
          }   
        }
        appdata.push(data_json)
      }
      else if (request.url === '/delete'){
        const data = JSON.parse(dataString)
        let str = data.str
        appdata = appdata.filter(o => o.name.toLowerCase() !== str.toLowerCase());
      }

      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end('test')
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
