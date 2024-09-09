const { title } = require('process')

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
  {} 
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  } else if( request.method === 'DELETE' ) {
    handleDelete( request, response )
  }
  else if( request.method === 'PUT' ) {
    handleEdit( request, response )
  }
})

const handleEdit = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    const titleToEdit = JSON.parse( dataString ).title

    const indexToEdit = appdata.findIndex(record => record.title === titleToEdit)

    if (indexToEdit !== -1) {
      appdata[indexToEdit] = JSON.parse( dataString )
      response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
      response.end('Record edited successfully')
    } else {
      response.writeHead(404, "Not Found", {'Content-Type': 'text/plain'})
      response.end('Record not found')
    }
  })
}

const handleDelete = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    const titleToDelete = JSON.parse( dataString ).title

    const indexToDelete = appdata.findIndex(record => record.title === titleToDelete)

    if (indexToDelete !== -1) {
      appdata.splice(indexToDelete, 1)
      response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
      response.end('Record deleted successfully')
    } else {
      response.writeHead(404, "Not Found", {'Content-Type': 'text/plain'})
      response.end('Record not found')
    }
  })
}

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else if( request.url === '/posts' ) {
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end( JSON.stringify( appdata ) )
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
    const newPost = JSON.parse( dataString )
    newPost.publication_date = new Date()
    newPost.wordCount = newPost.content.split(/\s+/).length;
    appdata.push( newPost )
    console.log( newPost )

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
console.log('listening on 3000')
