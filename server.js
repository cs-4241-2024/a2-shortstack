const { title } = require('process')

const express = require('express'),
       app = express(),
       path = require('path'),
       cookie = require('cookie-session'),
       MongoClient = require('mongodb').MongoClient,
       cookieParser = require('cookie-parser'),
       { OctoKit } = require('@octokit/rest'),
       axios = require('axios')
       ;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__dirname, '.env') });
}

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}));

app.use(express.static(path.join(__dirname, 'public')));
console.log(process.env.MONGO_URI)
      
const uri = process.env.MONGO_URI, 
      client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let collection = null;
async function connectToMongo() {
  try {
    await client.connect();
    collection = client.db('webware').collection('a3');

    console.log('Connected to MongoDB');
  } catch (e) {
    console.error(e);
  }
}

connectToMongo();


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  if (collection != null) {
    next();
  } else {
    res.status(500).send('Internal Server Error');
  }
});

app.use(express.static(__dirname + '/public'));

app.get('/posts', async (req, res) => {
  if (collection != null) {
    const posts = await collection.find({
      user: req.session.user,
    }).toArray();
    res.json(posts);
    }
});

app.get('/index.html', (req, res) => {
  if (req.session.user_id === undefined) {
    res.redirect("/main.html");
  }
});


app.get('/', async (req, res) => {
  if (req.session.user_id === undefined) {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
  } else 
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
}
);

app.get('/login', (req, res) => {
  const client_id = process.env.CLIENT_ID;
  const redirect_uri = '/auth/git';
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`
  res.redirect(githubAuthUrl);
});

app.get('/auth/git', async (req, res) => {
  try {
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const access_token = tokenResponse.data.access_token;
    if (!access_token) {
      return res.status(500).send('Failed to obtain access token.');
    }

    const octokit = new Octokit({
      auth: `token ${access_token}`,
    });

    const { data: user } = await octokit.users.getAuthenticated();

    const user_login = user.login;
    req.session.user = user_login;
    res.cookie('access_token', access_token, { httpOnly: true, secure: true });
    res.cookie('user', user_login, { httpOnly: true, secure: true });
    console.log(user_login);
    res.redirect('/main.html');

  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Error details:', error.response.data);
    }
    return res.status(500).send('Internal Server Error');
  }
});

app.post('/post', async (req, res) => {
  try {
    const newPost = req.body;
    newPost.publication_date = new Date();
    newPost.wordCount = newPost.content.split(/\s+/).length;

    const result = await collection.insertOne(newPost);
    console.log('New post inserted:', result.ops[0]);

    res.status(200).json({ message: 'Post created successfully', post: result.ops[0] });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




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
