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
        { 'title': 'cat in the hat', 'author': 'mary', 'year': 2023, 'genre':'fantasy','ranking':5,'authorStars':1},
        { 'title': 'rhymes', 'author': 'jane', 'year': 2030, 'genre':'non-fiction','ranking':2, 'authorStars':2},
        { 'title': 'love story', 'author': 'lisa', 'year': 2014, 'genre':'romance','ranking':2, 'authorStars':2} 
      ]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {//figure out if this GET request is requesting for data probabbly other ways to do without changing get
  const filename = dir + request.url.slice( 1 ) //page loading, setting data <-- other stuff I could add if I desire

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


    if (data.task==="add") {
      // ... do something with the data here!!!
    newData = {
      title: data.title,
      author: data.author,
      year: data.year,
      genre: data.genre,
      ranking: data.ranking,
      authorStars: 0,
    }
    // ... and then add it to appdata
    let add = 1;
    const rowCount = appdata.length;
    for (let i=0;i<rowCount;i++) {
      if (appdata[i].title === newData.title) {
        add = 0;
      }
    }
    if (newData.title===""|newData.author===""|newData.genre===""|newData.year==0|newData.ranking==0) {
      add=0;
    } else if (newData.ranking >5 |newData.ranking<0|newData.year<1000|newData.year>2024){
      add=0;
    }
    if (add == 1) {
      console.log("added to table");
      appdata.push(newData);
      //gotta do derivied part
      let arrayStars = [];
      for (let i=0;i<appdata.length;i++) {
        //row
        let rowAuthor = appdata[i].author;
        let rowStar = appdata[i].ranking;
  
        for (let j=0;j<appdata.length;j++) {
          if (!(i==j) && rowAuthor===appdata[j].author) {
            rowStar = rowStar + appdata[j].ranking;
          }
        }
        arrayStars.push(rowStar);
      }
      //let arrayStar = [];
      for (let i=0;i<arrayStars.length;i++) {
        let num = 1;
        let arrayAbove = []
        for (let j=0;j<arrayStars.length;j++) {
          
          //compare with the others in the list and making sure the ones with the same amount of stars in not counted twice
          if (!(i==j) &&arrayStars[j]>arrayStars[i] && !(arrayAbove.includes(arrayStars[j]))) {
            arrayAbove.push(arrayStars[j]);
            num = num + 1;
          }
        }
        appdata[i].authorStars = num;//correctly placing the right number
      }
      //gotta do derivied part
    
      console.log(appdata);
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end(JSON.stringify(appdata)) //obj:1
    }
    else if (add==0) {
      console.log("couldn't add to table");
      response.writeHead( 400, "Bad Request", {'Content-Type': 'text/plain' })
      response.end(JSON.stringify( appdata ) )
    }

    } else if (data.task === "delete") {
      let del = 0;
      let row = 0;
    const rowCount = appdata.length;
    for (let i=0;i<rowCount;i++) {
      //console.log('Found matching item:', appdata[i]);
      if (appdata[i].title === data.title) {
        del = 1;
        row = i;
      }
    }
  

    if (del == 1) {
      console.log("deleted from table");
      appdata.splice(row, 1);
      //gotta do derivied part
      let arrayStars = [];
      for (let i=0;i<appdata.length;i++) {
        //row
        let rowAuthor = appdata[i].author;
        let rowStar = appdata[i].ranking;
  
        for (let j=0;j<appdata.length;j++) {
          if (!(i==j) && rowAuthor===appdata[j].author) {
            rowStar = rowStar + appdata[j].ranking;
          }
        }
        arrayStars.push(rowStar);
      }
      //let arrayStar = [];
      for (let i=0;i<arrayStars.length;i++) {
        let num = 1;
        let arrayAbove = []
        for (let j=0;j<arrayStars.length;j++) {
          
          //compare with the others in the list and making sure the ones with the same amount of stars in not counted twice
          if (!(i==j) &&arrayStars[j]>arrayStars[i] && !(arrayAbove.includes(arrayStars[j]))) {
            arrayAbove.push(arrayStars[j]);
            num = num + 1;
          }
        }
        appdata[i].authorStars = num;//correctly placing the right number
      }
      //gotta do derivied part
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end(JSON.stringify(appdata)) //obj:1
    }
    else if (del==0) {
      console.log("couldn't delete from table");
      response.writeHead( 400, "Bad Request", {'Content-Type': 'text/plain' })
      response.end(JSON.stringify( appdata ) )
    }

    } else if (data.task === "display") {
      const rowCount = appdata.length;
      if (rowCount>0) {//success
        console.log("displaying table");
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end(JSON.stringify(appdata)) 
      } else {
        console.log("no rows in the table");
        response.writeHead( 400, "Bad Request", {'Content-Type': 'text/plain' })
        response.end(JSON.stringify( appdata))
      }
    } else if (data.task ==="change") {
      // ... do something with the data here!!!
      //gotta parse that row&col
      let change = 0;
      // console.log(data.row);
      // console.log(data.col);
      // console.log(data.col<5);
      // console.log(data.col>=0);
      // console.log(data.newVal);
      // console.log(Number(data.newVal));
      // console.log(Number(data.newVal)!=NaN);
      // console.log(NaN!=NaN);
      if (data.col<5 && data.col>-1 && Number(data.newVal)>0) {
        if (data.col==2) {
          appdata[data.row].year = Number(data.newVal);
          change = 1;

        } else if (data.col==4) {
          appdata[data.row].ranking = Number(data.newVal);
          change = 1;
          //gotta do derivied part
      let arrayStars = [];
      for (let i=0;i<appdata.length;i++) {
        //row
        let rowAuthor = appdata[i].author;
        let rowStar = appdata[i].ranking;
  
        for (let j=0;j<appdata.length;j++) {
          if (!(i==j) && rowAuthor===appdata[j].author) {
            rowStar = rowStar + appdata[j].ranking;
          }
        }
        arrayStars.push(rowStar);
      }
      //let arrayStar = [];
      for (let i=0;i<arrayStars.length;i++) {
        let num = 1;
        let arrayAbove = []
        for (let j=0;j<arrayStars.length;j++) {
          
          //compare with the others in the list and making sure the ones with the same amount of stars in not counted twice
          if (!(i==j) &&arrayStars[j]>arrayStars[i] && !(arrayAbove.includes(arrayStars[j]))) {
            arrayAbove.push(arrayStars[j]);
            num = num + 1;
          }
        }
        appdata[i].authorStars = num;//correctly placing the right number
      }
      //gotta do derivied part

        }
      } else if (data.col<5 && data.col>=0 && data.newVal != "") {
        console.log("here");
        if (data.col==0) {
          appdata[data.row].title = data.newVal;
          change = 1;

        } else if (data.col==1) {
          appdata[data.row].author = data.newVal;
          change = 1;

        } else if (data.col==3) {
          appdata[data.row].genre = data.newVal;
          change = 1;

        }
      }
      if (change==1) {
        //did change
        console.log("changed value");
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end(JSON.stringify(appdata)) 
      } else if (change==0) {
        //error
        console.log("couldn't change");
        response.writeHead( 400, "Bad Request", {'Content-Type': 'text/plain' })
        response.end(JSON.stringify( appdata))
      } 

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
