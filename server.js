
/*

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
  {product: "iPhone", releaseYear: 2007, releaseCost: 499, currentCost: 605},
  {product: "Scrub Daddy", releaseYear: 2012, releaseCost: 1.99, currentCost: 3.49}
]

function calculateCurrentCost(product) {
  let yearsOfInflation = 2024 - product.releaseYear;
  let inflationRate = 1.0328;
  let newCost = product.releaseCost;
  while (yearsOfInflation > 0) {
    newCost = newCost * inflationRate;
    yearsOfInflation--;
  }
  product.currentCost = newCost.toFixed(2);  // Keep the result to 2 decimal places
}

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

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {

    const parsedData = JSON.parse(dataString);
    if (parsedData.action === 'add') {
      calculateCurrentCost(parsedData);
      appdata.push(parsedData);
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ status: 'success', appdata }));
    } else if (parsedData.action === 'get') {
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      //response.end('test')
      response.end( JSON.stringify( appdata))
    } else if (parsedData.action === 'delete') {
      appdata = appdata.filter(item => item.product !== parsedData.product);
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ status: 'deleted', appdata }));
    }
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

*/








const express = require("express"),
      { MongoClient, ObjectId } = require("mongodb"),
      app = express()

const path = require('path');
const port = 3000;


const client = new MongoClient( uri )

let collection = null

async function run() {
  await client.connect()
  collection = await client.db("datatest").collection("test")

  // route to get all docs
  app.get("/docs", async (req, res) => {
    if (collection !== null) {
      const docs = await collection.find({}).toArray()
      res.json( docs )
    }
  })
}

run()

let appdata = [
  {product: "iPhone", releaseYear: 2007, releaseCost: 499, currentCost: 605},
  {product: "Scrub Daddy", releaseYear: 2012, releaseCost: 1.99, currentCost: 3.49}
];

// Middleware to handle JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Helper function to calculate the current cost of a product
function calculateCurrentCost(product) {
  let yearsOfInflation = 2024 - product.releaseYear;
  let inflationRate = 1.0328;
  let newCost = product.releaseCost;
  while (yearsOfInflation > 0) {
    newCost = newCost * inflationRate;
    yearsOfInflation--;
  }
  product.currentCost = newCost.toFixed(2);  // Keep the result to 2 decimal places
}

// Route to handle fetching and displaying data
app.post('/submit', (req, res) => {
  const { action, product, releaseYear, releaseCost } = req.body;

  if (action === 'add') {
    const newProduct = {
      product,
      releaseYear: parseInt(releaseYear),
      releaseCost: parseFloat(releaseCost),
      currentCost: 0,
    };
    calculateCurrentCost(newProduct);
    appdata.push(newProduct);
    res.json({ status: 'success', appdata });
  } else if (action === 'get') {
    res.json(appdata);
  } else if (action === 'delete') {
    appdata = appdata.filter(item => item.product !== product);
    res.json({ status: 'deleted', appdata });
  } else {
    res.status(400).send('Invalid action');
  }
});

// Start the server
app.listen(process.env.PORT || port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

