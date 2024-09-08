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

const foodOptions = {
  10: "Burger",
  5: "Fries",
  3: "Milkshake"
};

// Global variable to store the cumulative total price (in a real-world scenario, this would likely be stored in a database)
let cumulativeTotalPrice = 0;

const handlePost = function(request, response) {
  let dataString = '';

  // Collect the data from the request
  request.on('data', function(data) {
    dataString += data;
  });

  // Once all the data has been received, process it
  request.on('end', function() {
    const orderData = JSON.parse(dataString);  // Parse the received data

    // If the request contains a special "clear" action, clear the appdata
    if (orderData.action && orderData.action === "clear") {
      // Clear the appdata by resetting it to an empty array
      appdata.length = 0;

      // Respond back to the client that the data has been cleared
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({
        message: "All data has been cleared.",
        appdata: appdata  // Now, appdata will be an empty array
      }));

      console.log("Appdata cleared.");
      return;
    }

    const foodPrice = parseInt(orderData.food); // Extract food price from the data
    const quantity = parseInt(orderData.quantity); // Extract quantity from the data

    // Calculate the total price for this order
    const orderTotalPrice = foodPrice * quantity;

    // Update the cumulative total price
    cumulativeTotalPrice = orderData.cumulativeTotalPrice + orderTotalPrice;

    console.log(`Received order: ${orderData.name} ordered ${quantity} x ${foodOptions[foodPrice]} ($${foodPrice} each)`);
    console.log(`Order total price: $${orderTotalPrice}`);
    console.log(`Cumulative total price: $${cumulativeTotalPrice}`);

    // Create a new order object
    const newOrder = {
      name: orderData.name,
      foodName: foodOptions[foodPrice],  // Map the food price to the corresponding food name
      foodPrice: foodPrice,
      quantity: quantity
    };

    // Append the new order to the appdata array
    appdata.push(newOrder);

    // Log the updated appdata for debugging
    console.log("Orders made: ", appdata);

    // Respond to the client with a message and optionally the updated appdata array
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({
      message: `Order received. ${orderData.name} ordered ${quantity} x ${foodOptions[foodPrice]} ($${foodPrice} each)`,
      appdata: appdata  // Return the updated appdata array
    }));
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

