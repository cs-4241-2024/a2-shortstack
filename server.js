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
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})
const purchases = []; //this will be the "database" of JSON objects 

/* 
  A purchase will have 
  1. A title 
  2. A category (one of utilities, groceries, and fun)
  3. A store
  4. A price 
  5. The cash on hand when purchased
  6. (derived) whether or not it  was within a budget (see isInBudget for budget details)
*/ 


const isInBudget = (aPurchase) => { 
  //for the purposes of this assignment, a purchase is in budget if it is 15% or less of the cash on hand 
  const budget = aPurchase.cashOnHand * .15; 
  if(aPurchase.price > budget){
    return false; 
  }
  return true; 

}

const addPurchase = (aPurchase) => { 
  //create a new object with the derived field and to validate fields
  const addToServer = { 
    "title": aPurchase.title, 
    "category": aPurchase.category, 
    "store": aPurchase.store,  
    "price": aPurchase.price, 
    "cashOnHand": aPurchase.cashOnHand, 
    "affoardable?": isInBudget(aPurchase), 
  }; 
  //add to the server array 
  purchases.push(addToServer);
  //log array for debugging  
  console.log("new", purchases); 
}

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else if(request.url === "/api/getResults"){
    console.log(purchases); 
    response.writeHead(200, "OK", {"content-type": 'application/json'}); 
    response.end(JSON.stringify(purchases)); 
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
    const body = JSON.parse(dataString); 
    console.log(dataString); 

    if(request.url === "/api/createPurchase"){

      addPurchase(body); 
      
    }

    // ... do something with the data here!!!

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
