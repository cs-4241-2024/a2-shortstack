const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const yarn_type_to_cost = {
  "None": 0,
  "Chenille": 10,
  "Worsted Weight": 5,
  "Acrylic": 7,
  "Velvet": 15,
  "Cashmere Wool": 20,
  "Faux Fur": 12
}

const appdata = []

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleStartup = function( request, response ) {
  response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
  response.end(JSON.stringify(appdata))
}

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 
  
  //console.log(filename)
  
  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else {
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  
  
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    
    let item = JSON.parse( dataString )
    
    if(item.type === "remove") {
      item = item.payload
      for (let existing_item of appdata) {
        if(existing_item['project_name'] == item['project_name']) {
          appdata.splice(appdata.indexOf(existing_item), 1)
          break
        }
      }
    }
    
    if(item.type === "send") {
      item = item.payload
      item["total_cost"] = item["yarn_count"] * yarn_type_to_cost[item["yarn_type"]]
      let should_add = true
      for (let existing_item of appdata) {
        if(existing_item['project_name'] == item['project_name']) {
          appdata[appdata.indexOf(existing_item)] = item
          should_add = false
          break
        }
      }

      if(should_add) {
        appdata.push(item)
      }
    }
    
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
