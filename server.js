const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let appdata = [
  { 'date': '8/26/2024', 'entry': 'Today I was sad.', happiness: 2, motivation: 1, 'goodDay': 'no'},
  { 'date': '8/31/2024', 'entry': 'I saw a turtle today.', happiness: 4, motivation: 3, 'goodDay': 'yes'},
  { 'date': '9/1/2024', 'entry': 'I need to go to the gym', happiness: 3, motivation: 3, 'goodDay': 'yes'} 
]

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
    const data = JSON.parse( dataString )
    if(data.task==="add")
    {
      newData = 
      {
        date: data.date,
        entry: data.entry,
        happiness: data.happiness,
        motivation: data.motivation,
        goodDay: data.goodDay
      }
      appdata.push(newData)
      // console.log(appdata)
    }
    else if(data.task==="leave")
    {
      // console.log(appdata)
    }
    else if(data.task==="delete")
    {
      appdata = appdata.filter(item => item.date !== data.deleteDate);
      // console.log(appdata)
    }

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
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
       response.end(content)

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )
// populate a paragraph or a tabular