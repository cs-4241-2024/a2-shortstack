const express = require('express'),
    parser = require('body-parser'),
    fs = require('fs'),
    path = require('path'),
    app = express(),
    port = process.env.PORT || 3000,
    key = 'secretkey',
    uri = 'put-mongo-db-key-here',
    client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

let habitList;
let usersList;

// connect to db
client.connect(err => {
  if (err) throw err;
  console.log('Connected to MongoDB');
  const db = client.db("habit-tracker");
  habitList = db.collection('habits');
  usersList = db.collection('users');
});

app.use(bodyParser.json());
app.use(express.static('public'));

// index page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// add registration if time needed
// login
app.post('/login', async (req, res, next) => {
  const {username, password} = req.body;
  const user = await usersList.findOne({username});

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({username}, key, {expiresIn: '1h'});
    res.json({token});
  } else {
    res.status(401).send('Invalid Username or Password');
  }
})

// authenticate user
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if(token) {
    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        return res.status(401).send('Invalid Token');
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).send('Token Not Found');
  }
};

// get habits
app.get('/getHabits', authenticate, async (req, res) => {
  try {
    const habits = await habitList.find({username: req.user.username}).toArray();
    res.json(habits);
  } catch (err) {
    res.status(500).send('Error getting habits');
  }
});

// add habit
app.post('/addHabit', authenticate, async (req, res) => {
  const newHabit = req.body;
  newHabit.username = req.user.username;

  try {
    await habitList.insertOne(newHabit);
    const updatedHabits = await habitList.find({username: req.user.username}).toArray();
    res.json(updatedHabits);
  } catch (err) {
    res.status(500).send('Error adding habit');
  }
})

// delete habit
app.delete('/deleteHabit', authenticate, async (req, res) => {
  const {habitName} = req.body;

  try {
    await habitList.deleteOne({habitName, username: req.user.username});
    const updatedHabits = await habitList.find({username: req.user.username}).toArray();
    res.json(updatedHabits);
  } catch (err) {
    res.status(500).send('Error deleting habit');
  }
})

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})






// const file = path.join(__dirname, 'data.json');
// let appdata = [
//   {'habitName': 'Exercise', 'startDate': '2024-09-03', 'frequency': 'daily', 'consistency': 'In Progress'}
// ]
// //
// try {
//   if (fs.existsSync(file)) {
//     const fileContent = fs.readFileSync(file, 'utf8');
//     if (fileContent) {
//       appdata = JSON.parse(fileContent);
//     }
//   }
// } catch (err) {
//   console.error('Error reading data file:', err);
// }
// //
// const server = http.createServer( function( request,response ) {
//   if( request.method === 'GET' ) {
//     handleGet( request, response )
//   }else if( request.method === 'POST' ){
//     handlePost( request, response )
//   } else if( request.method === 'DELETE' ){
//     handleDelete(request, response)
//   }
// })
//
// const handleGet = function( request, response ) {
//   const filename = dir + request.url.slice( 1 )
//
//   if( request.url === '/' ) {
//     sendFile( response, 'public/index.html' )
//   } else if (request.url === '/getHabits') {
//     response.writeHead(200, { 'Content-Type': 'application/json' });
//     response.end(JSON.stringify( appdata ) );
//   } else{
//     sendFile( response, filename )
//   }
// }
//
// const handlePost = function( request, response ) {
//   let dataString = ''
//
//   request.on( 'data', function( data ) {
//       dataString += data
//   })
//
//   request.on( 'end', function() {
//     if(request.url === '/addHabit') {
//       const newHabit = JSON.parse( dataString );
//       const habitDate = new Date(newHabit.startDate);
//       const currentDate = new Date();
//       const msToDay = 1000 * 60 * 60 * 24;
//
//
//       if (habitDate < currentDate) {
//         console.log(Math.abs((currentDate - habitDate) / msToDay ));
//         newHabit.consistency = Math.floor((currentDate - habitDate) / msToDay ) + " days";
//       } else if (habitDate > currentDate) {
//         newHabit.consistency = "Not Started";
//       } else {
//         newHabit.consistency = "0 days"
//       }
//
//       appdata.push(newHabit);
//       try {
//         fs.writeFileSync(file, JSON.stringify( appdata, null, 2 ), 'utf8' );
//       } catch (err) {
//         console.error('Error writing to data file:', err);
//       }
//
//
//       response.writeHead( 200, "OK", {'Content-Type': 'application/json' });
//       response.end(JSON.stringify(appdata));
//     }
//   })
// }
//
// const handleDelete = function( request, response ) {
//   let dataString = '';
//   request.on( 'data', function( data ) {
//     dataString += data;
//   });
//
//   request.on( 'end', function() {
//     const {habitName} = JSON.parse( dataString );
//     //
//     if (habitName === undefined) {
//       console.error('Habit name is undefined');
//       response.writeHead(400, {'Content-Type': 'application/json'});
//       response.end(JSON.stringify({ error: 'Habit name is undefined' }));
//       return;
//     }
//     //
//     appdata = appdata.filter(habit => habit.habitName !== habitName);
//     fs.writeFileSync(file, JSON.stringify( appdata, null, 2 ) );
//     response.writeHead( 200, {'Content-Type': 'application/json' });
//     response.end(JSON.stringify(appdata));
//   })
// }
//
// const sendFile = function( response, filename ) {
//    const type = mime.getType( filename )
//
//    fs.readFile( filename, function( err, content ) {
//
//      // if the error = null, then we've loaded the file successfully
//      if( err === null ) {
//
//        // status code: https://httpstatuses.com
//        response.writeHeader( 200, { 'Content-Type': type })
//        response.end( content )
//
//      }else{
//
//        // file not found, error code 404
//        response.writeHeader( 404 )
//        response.end( '404 Error: File Not Found' )
//
//      }
//    })
// }
//
// server.listen( process.env.PORT || port )
