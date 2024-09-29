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

const uri = `mongodb+srv://aekratman:abbeysPassword@abbeyscluster.0bppf.mongodb.net/?retryWrites=true&w=majority&appName=AbbeysCluster/`
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
  await client.connect()
  collection = await client.db("logFromAssignment").collection("logs")
}
run()




app.post( '/add', async (req,res) => {
  const result = await collection.insertOne( req.body )
  res.json( result )
})
 


app.post( '/login', async (req,res)=> {

  console.log( req.body )
  const username = req.body.username
  console.log(username);

  const password = req.body.password
  console.log(password);

  const user = await collection.findOne({ username });

  
  if( req.body.password === password){
    req.session.login = true
    res.redirect( 'main.html' )

    

  }else{
    // cancel session login in case if it's true
    req.session.login = false
    // go back to login
    res.render('index', { msg:'Login has failed; try again!', layout:false })
  }
})

app.use(express.static("./") )

app.post("/submit", async (req, res) => {
// code from tutorial that does insertion
})

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

app.get( '/main.html', ( req, res) => {
    res.render( 'main', { msg:'Success! You are now logged in!', layout:false })
})



app.listen( process.env.PORT || 3000 )