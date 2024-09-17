const express = require('express'),
      path = require('path'),
      cookie = require('cookie-session'),
      MongoClient = require('mongodb').MongoClient,
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      { Octokit } = require('@octokit/rest'),
      session = require('express-session'),
      axios = require('axios');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__dirname, '.env') });
}

// Middleware setup
app.use(bodyParser.json());
app.use(cookieParser()); 
app.use(cookie({
  name: 'session',
  keys: ['key1', 'key2']
}));
app.use(session({ secret: process.env.COOKIE_SECRET, resave: false, saveUninitialized: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let collection = null;

async function connectToMongo() {
  try {
    await client.connect();
    collection = client.db('webware').collection('a3');
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error('Error connecting to MongoDB:', e);
  }
}

connectToMongo();

app.get('/check-auth', (req, res) => {
  if (req.session && req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

function checkAuth(req, res, next) {
  if (!req.cookies.user || !req.session.user) {
    return res.redirect('/');
  }
  next();
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/main.html', checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.get('/auth/git', (req, res) => {
  const clientId = process.env.CLIENT_ID;
  const redirectUri = 'https://webware-a3-7443f86eaef6.herokuapp.com/auth/git/callback';
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
  res.redirect(githubAuthUrl);
});

app.get('/auth/git/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send('Code is missing');
  }

  try {
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;
    if (!accessToken) {
      return res.status(400).send('Failed to obtain access token');
    }

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const user = userResponse.data;
    req.session.user = user;
    res.cookie('user', user.login, { maxAge: 900000, httpOnly: true });
    res.redirect('/main.html');
  } catch (error) {
    console.error('Error during GitHub OAuth:', error);
    res.status(500).send('Authentication failed');
  }

});

app.get('/posts', async (req, res) => {
  if (collection != null) {
    const posts = await collection.find({
      yourname: req.session.user,
    }).toArray();
    res.json(posts);
  }
});

// make post
app.post('/submit', checkAuth, async (req, res) => {
  const post = req.body;
  if (!post || !post.content) {
    return res.status(400).send('Post content is missing');
  }
  try {
    post.publication_date = new Date();
    post.wordCount = post.content.split(/\s+/).length;
    post.yourname = req.session.user;

    const result = await collection.insertOne(post);
    console.log('New post inserted:', result);

    res.status(200).json({ message: 'Post created successfully'});
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.put('/update', checkAuth, async (req, res) => {
  const post = req.body;
  if (!post || !post.content) {
    return res.status(400).send('Post content is missing');
  }
  try {
    post.publication_date = new Date();
    post.wordCount = post.content.split(/\s+/).length;
    post.yourname = req.session.user;

    const result = await collection.updateOne({ title : post.title }, { $set: post });
    console.log('Post updated:', result);

    res.status(200).json({ message: 'Post updated successfully'});
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'This faild: Internal Server Error' });
  }
});

// allow cors header
app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// start the server
app.listen((process.env.PORT || 3000), function () {
  console.log('Node app is running on port', process.env.PORT || 3000);
});
