



// ======


const express = require( 'express' ),
      cookie  = require( 'cookie-session' ),
      hbs     = require( 'express-handlebars' ).engine,
      app     = express()
      { MongoClient, ObjectId } = require('mongodb');

// use express.urlencoded to get data sent by defaut form actions
// or GET requests
app.use( express.urlencoded({ extended:true }) )
app.use(express.static("./") )
app.use(express.json() )
const uri = `mongodb+srv://tester:${process.env.password}@cluster0.f9zkh.mongodb.net/`
const client = new MongoClient( uri )



// handlebars
app.engine( 'handlebars',  hbs() )
app.set(    'view engine', 'handlebars' )
app.set(    'views',       './views' )

app.use( cookie({
  name: 'session',
  keys: ['secretKey01', 'secretKey02']
}))

const url - 'mongodb://localhost:3000'
const client = new MongoClient(url);

let collection = null

async function run() {
  await client.connect()
  collection = await client.db("datatest6").collection("test")
}
run()




app.post( '/add', async (req,res) => {
  const result = await collection.insertOne( req.body )
  res.json( result )
})
 

app.post( '/login', (req,res)=> {

  console.log( req.body )
  const username = req.body.username
  console.log(username);

  const password = req.body.password
  console.log(password);
  

  
  // below is *just a simple authentication example* 
  // for A3, you should check username / password combos in your database
  if( req.body.password === 'test' ) {
    // define a variable that we can check in other middleware
    // the session object is added to our requests by the cookie-session middleware
    req.session.login = true
    
    // since login was successful, send the user to the main content
    // use redirect to avoid authentication problems when refreshing
    // the page or using the back button, for details see:
    // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern 
    res.redirect( 'main.html' )
  }else{
    // cancel session login in case it was previously set to true
    req.session.login = false
    // password incorrect, send back to login page
    res.render('index', { msg:'login failed, please try again', layout:false })
  }
})


// route to get all docs
app.get("/docs", async (req, res) => {
  if (collection !== null) {
    const docs = await collection.find({}).toArray()
    res.json( docs )
  }
})

app.get( '/', (req,res) => {
  res.render( 'index', { msg:'', layout:false })
})

// add some middleware that always sends unauthenicaetd users to the login page
app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
    res.render('index', { msg:'login failed, please try again', layout:false })
})

app.get( '/main.html', ( req, res) => {
    res.render( 'main', { msg:'success you have logged in', layout:false })
})



app.listen( process.env.PORT || 3000 )