const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000,
    path = require( 'path' )

const file = path.join(__dirname, 'data.json');
let appdata = [
  {'habitName': 'Exercise', 'startDate': '2024-09-03', 'frequency': 'daily', 'consistency': 'In Progress'}
]
//
try {
  if (fs.existsSync(file)) {
    const fileContent = fs.readFileSync(file, 'utf8');
    if (fileContent) {
      appdata = JSON.parse(fileContent);
    }
  }
} catch (err) {
  console.error('Error reading data file:', err);
}
//
const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  } else if( request.method === 'DELETE' ){
    handleDelete(request, response)
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if (request.url === '/getHabits') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify( appdata ) );
  } else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    if(request.url === '/addHabit') {
      const newHabit = JSON.parse( dataString );
      const habitDate = new Date(newHabit.startDate);
      const currentDate = new Date();
      const msToDay = 1000 * 60 * 60 * 24;


      if (habitDate < currentDate) {
        console.log(Math.abs((currentDate - habitDate) / msToDay ));
        newHabit.consistency = Math.floor((currentDate - habitDate) / msToDay ) + " days";
      } else if (habitDate > currentDate) {
        newHabit.consistency = "Not Started";
      } else {
        newHabit.consistency = "0 days"
      }

      appdata.push(newHabit);
      try {
        fs.writeFileSync(file, JSON.stringify( appdata, null, 2 ), 'utf8' );
      } catch (err) {
        console.error('Error writing to data file:', err);
      }


      response.writeHead( 200, "OK", {'Content-Type': 'application/json' });
      response.end(JSON.stringify(appdata));
    }
  })
}

const handleDelete = function( request, response ) {
  let dataString = '';
  request.on( 'data', function( data ) {
    dataString += data;
  });

  request.on( 'end', function() {
    const {habitName} = JSON.parse( dataString );
    console.log('Deleting habit with name:', habitName);
    //
    if (habitName === undefined) {
      console.error('Habit name is undefined');
      response.writeHead(400, {'Content-Type': 'application/json'});
      response.end(JSON.stringify({ error: 'Habit name is undefined' }));
      return;
    }
    //
    appdata = appdata.filter(habit => habit.habitName !== habitName);
    fs.writeFileSync(file, JSON.stringify( appdata, null, 2 ) );
    response.writeHead( 200, {'Content-Type': 'application/json' });
    response.end(JSON.stringify(appdata));
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
