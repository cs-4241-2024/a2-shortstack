const { randomUUID } = require('crypto')

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
  // Example : { 'book-id': '1', 'title': "Book 1", 'author': "Author 1", "pages": 100, "started": "", "finished": "", "status": "read" },
]

// Make server that listens for requests
const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }else if( request.method === 'DELETE' ){
    handleDelete( request, response ) 
  } else if( request.method === 'PUT' ){
    handlePut( request, response ) 
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

// Handle POST requests (add new book)
const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    const newBook = JSON.parse( dataString ); // Parse JSON data

    // Set derived field
    if (newBook["status"] === "reading" && newBook["started"] === "") {
      const today = new Date().toLocaleDateString("en-us", {year: "numeric", month: "2-digit", day: "2-digit"});
      newBook["started"] = today;
    }
    newBook["book-id"] = randomUUID();  // Set unique ID
    newBook["avg-pages"] = null;
    try {
      if (newBook["started"] !== "" && newBook["finished"] !== "") { 
        const startDate = new Date(newBook["started"]);
        const finishDate = new Date(newBook["finished"]);
        const diffDays = Math.ceil((finishDate - startDate) / (1000 * 60 * 60 * 24));
        newBook["avg-pages"] = Math.round(newBook["pages"] / diffDays);
      }
    } catch (error) {
      console.log("Error calculating average pages per day: " + error);
    }
    appdata.push( newBook );  // Add to appdata object


    response.writeHead( 200, "OK", {'Content-Type': 'application/json'})
    response.end(JSON.stringify(appdata)) // Return updated book data
  })
}

// Handle PUT requests (update book attribute)
const handlePut = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    const bookData = JSON.parse( dataString ); // Parse JSON data

    // TODO: Update started and finished date for status change
    let success = false;
    appdata.forEach(book => { 
      if (book["book-id"] === bookData["book-id"]) {
        book[bookData["key"]] = bookData["value"];  // Update book attribute
        success = true;
        if (bookData["key"] === "status") {
          if (bookData["value"] === "reading") {
            const today = new Date().toLocaleDateString("en-us", {year: "numeric", month: "2-digit", day: "2-digit"});
            book["started"] = today;
          } else if (bookData["value"] === "read") {
            const today = new Date().toLocaleDateString("en-us", {year: "numeric", month: "2-digit", day: "2-digit"});
            book["finished"] = today;
          }
        }
      } 
    });

    if (!success) { 
      response.writeHead( 404, "Book Not Found", {'Content-Type': 'text/plain'});
    } else {
      response.writeHead( 200, "OK", {'Content-Type': 'application/json'})
    }
    response.end(JSON.stringify(appdata)) // Return updated book data
  })
}

// Handle DELETE requests (delete book)
const handleDelete = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log('going to delete ' + dataString)
  
    // Find book in appdata
    const bookIndex = appdata.findIndex(book => book["book-id"] === dataString);
    if (bookIndex !== -1) {
      appdata.splice(bookIndex, 1);  // Remove book from appdata
      response.writeHead( 200, "OK", {'Content-Type': 'application/json'});
    } else {
      response.writeHead( 404, "Book Not Found", {'Content-Type': 'text/plain'});
    }
    response.end(JSON.stringify(appdata));
  })
}

// Handle file requests
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
