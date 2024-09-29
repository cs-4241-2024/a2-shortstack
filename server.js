
require('dotenv').config()


const express = require( 'express' ),
      cookie  = require( 'cookie-session' ),
      hbs     = require( 'express-handlebars' ).engine,
      { MongoClient, ObjectId } = require('mongodb');
      app     = express()


// use express.urlencoded to get data sent by defaut form actions
// or GET requests
app.use( express.urlencoded({ extended:true }) )
app.use(express.json() )

const uri = 'mongodb+srv://aekratman:abbeysPassword@abbeyscluster.0bppf.mongodb.net/?retryWrites=true&w=majority&appName=AbbeysCluster/'
const client = new MongoClient( uri )




// handlebars
app.engine( 'handlebars',  hbs() )
app.set(    'view engine', 'handlebars' )
app.set(    'views',       './views' )

app.use( cookie({
  name: 'session',
  keys: ['secretKey01', 'secretKey02']
}))

const url = 'mongodb://localhost:3000'

// create variable collection
let collection = null;

async function run() {
  try {
    await client.connect();  
    
    // Set the collection
    collection = client.db("logFromAssignment").collection("logs");
    console.log("Collection is set: ", collection !== null);
    
    // Insert a test document to the collection
    // await collection.insertOne({ testField: "testValue" });
    console.log("Inserted a test document into 'logs' collection.");
    
    return collection;
  } catch (err) {
    console.error("Error during MongoDB connection or insertion:", err);
  }
}

run().then((collection) => {
  if (collection) {
    console.log("Collection ready!");
  } else {
    console.log("Collection is not all set.");
  }
});

run();




app.post( '/add', async (req,res) => {
  const result = await collection.insertOne( req.body )
  res.json( result )
})
 


app.post( '/login', async (req,res)=> {

  console.log( req.body )

  const username = req.body.username || "null"
  const password = req.body.password
  console.log(username);
  console.log(`Attempting login for user: ${username}`);




  if (collection === null){
    console.log("collection not set");
  }

  user = await collection.findOne({username: username});

  
  if( req.body.password === password){
    req.session.login = true;
    req.session.username = username;
    console.log(`User logged in: ${username}`)
    res.redirect( 'login' )

    if (!user){
      await collection.insertOne({ username: username, password: password });
    }
  }else{
    // cancel session login in case if it's true
    req.session.login = false
    res.render('index', { msg:'Login has failed; try again!', layout:false })
  }
})

app.use(express.static("./") )



app.post('/submit', async (req, res) => {
  const { name, musical, songs } = req.body; // Extract other fields
  const username = req.session.username; // Get username from session

  console.log("Received data:", req.body); // Log the incoming data

  try {
      // Insert the new document into the MongoDB collection
      const result = await collection.insertOne({ username, name, musical, songs });
      console.log("Insertion result:", result); // Log the result of the insertion

      // Check if the insertion was successful
      if (result.insertedId) {
          // Fetch all documents from the collection after insertion
          const allDocuments = await collection.find().toArray(); // Fetch all entries
          console.log("All documents fetched:", allDocuments); // Log all documents

          // Send back all documents in an array
          res.json(allDocuments);
      } else {
          res.status(500).json({ error: 'Insertion failed, no document was inserted.' });
      }
  } catch (error) {
      console.error("Error inserting document:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});






// route to get all docs
app.get("/docs", async (req, res) => {
  if (collection !== null) {
    const docs = await collection.find({}).toArray()
    res.json( docs )
  }
})

app.get( '/', (req,res) => {
  console.log("Rendering your res, apping your get");
  res.render( 'index', { msg:'', layout:false })

})



// add some middleware that always sends unauthenicaetd users to the login page
app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
    res.render('index', { msg:'login failed, please try again', layout:false })
})

app.get('/login', (req, res) => {
    const username = req.session.username || ''; // Get username from session
    const msg = username ? `You've logged in! Welcome, ${username}` : '';
    res.render('login', { msg: msg, layout: false });
});




const appdata = []



const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  } else if ( request.method === 'DELETE' ){
    handleDelete ( request, response ) 
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
    const data = JSON.parse( dataString )
    
    appdata.push(data);
    console.log(appdata);    
  
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end( JSON.stringify( appdata ) )
  })
}

// new handle, for deletion: very similar to the others!

const handleDelete = function(request, response) {
  let dataString = '';

  request.on('data', function(data) {
    dataString += data;
  });

  request.on('end', function() {

      const data = JSON.parse(dataString);
      const { name } = data;

      // Find delete index
      const indexNum = appdata.findIndex(item => item.name === name);

    // if the index exists, delete it
      if (indexNum !== -1) {
        appdata.splice(indexNum, 1);
        
        console.log("Current array:");
        console.log(appdata);
        
        // same as handleget
        response.writeHead(200, "OK", {'Content-Type': 'application/json'});
        response.end(JSON.stringify(appdata));
      } 
  } 
)};
       

    
    
    
    

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


app.listen( process.env.PORT || 3000 )