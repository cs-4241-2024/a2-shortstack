const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const lvl1 = [
  { 'level': "Wizard Level:", 'available': 1},
  { 'level': "Level", 'available': "Total", 'used': "Used", 'remaining': "Remaining"},
  { 'level': 1, 'available': 2, 'used': 0, 'remaining': 2},
  { 'level': 2, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 3, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 4, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 5, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 6, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 7, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 8, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 9, 'available': 0, 'used': 0, 'remaining': 0}
]

const lvl2 = [
  { 'level': "Wizard Level:", 'available': 2},
  { 'level': "Level", 'available': "Total", 'used': "Used", 'remaining': "Remaining"},
  { 'level': 1, 'available': 3, 'used': 0, 'remaining': 3},
  { 'level': 2, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 3, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 4, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 5, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 6, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 7, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 8, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 9, 'available': 0, 'used': 0, 'remaining': 0}
]

const lvl3 = [
  { 'level': "Wizard Level:", 'available': 3},
  { 'level': "Level", 'available': "Total", 'used': "Used", 'remaining': "Remaining"},
  { 'level': 1, 'available': 4, 'used': 0, 'remaining': 3},
  { 'level': 2, 'available': 2, 'used': 0, 'remaining': 0},
  { 'level': 3, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 4, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 5, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 6, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 7, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 8, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 9, 'available': 0, 'used': 0, 'remaining': 0}
]

const lvl4 = [
  { 'level': "Wizard Level:", 'available': 4},
  { 'level': "Level", 'available': "Total", 'used': "Used", 'remaining': "Remaining"},
  { 'level': 1, 'available': 4, 'used': 0, 'remaining': 3},
  { 'level': 2, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 3, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 4, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 5, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 6, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 7, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 8, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 9, 'available': 0, 'used': 0, 'remaining': 0}
]

const lvl5 = [
  { 'level': "Wizard Level:", 'available': 5},
  { 'level': "Level", 'available': "Total", 'used': "Used", 'remaining': "Remaining"},
  { 'level': 1, 'available': 4, 'used': 0, 'remaining': 3},
  { 'level': 2, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 3, 'available': 2, 'used': 0, 'remaining': 0},
  { 'level': 4, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 5, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 6, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 7, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 8, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 9, 'available': 0, 'used': 0, 'remaining': 0}
]

const lvl6 = [
  { 'level': "Wizard Level:", 'available': 6},
  { 'level': "Level", 'available': "Total", 'used': "Used", 'remaining': "Remaining"},
  { 'level': 1, 'available': 4, 'used': 0, 'remaining': 3},
  { 'level': 2, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 3, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 4, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 5, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 6, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 7, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 8, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 9, 'available': 0, 'used': 0, 'remaining': 0}
]

const lvl7 = [
  { 'level': "Wizard Level:", 'available': 7},
  { 'level': "Level", 'available': "Total", 'used': "Used", 'remaining': "Remaining"},
  { 'level': 1, 'available': 4, 'used': 0, 'remaining': 3},
  { 'level': 2, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 3, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 4, 'available': 1, 'used': 0, 'remaining': 0},
  { 'level': 5, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 6, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 7, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 8, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 9, 'available': 0, 'used': 0, 'remaining': 0}
]

const lvl8 = [
  { 'level': "Wizard Level:", 'available': 8},
  { 'level': "Level", 'available': "Total", 'used': "Used", 'remaining': "Remaining"},
  { 'level': 1, 'available': 4, 'used': 0, 'remaining': 3},
  { 'level': 2, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 3, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 4, 'available': 2, 'used': 0, 'remaining': 0},
  { 'level': 5, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 6, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 7, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 8, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 9, 'available': 0, 'used': 0, 'remaining': 0}
]

const lvl9 = [
  { 'level': "Wizard Level:", 'available': 9},
  { 'level': "Level", 'available': "Total", 'used': "Used", 'remaining': "Remaining"},
  { 'level': 1, 'available': 4, 'used': 0, 'remaining': 3},
  { 'level': 2, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 3, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 4, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 5, 'available': 1, 'used': 0, 'remaining': 0},
  { 'level': 6, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 7, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 8, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 9, 'available': 0, 'used': 0, 'remaining': 0}
]

const lvl10 = [
  { 'level': "Wizard Level:", 'available': 10},
  { 'level': "Level", 'available': "Total", 'used': "Used", 'remaining': "Remaining"},
  { 'level': 1, 'available': 4, 'used': 0, 'remaining': 3},
  { 'level': 2, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 3, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 4, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 5, 'available': 2, 'used': 0, 'remaining': 0},
  { 'level': 6, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 7, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 8, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 9, 'available': 0, 'used': 0, 'remaining': 0}
]

const lvl11 = [
  { 'level': "Wizard Level:", 'available': 11},
  { 'level': "Level", 'available': "Total", 'used': "Used", 'remaining': "Remaining"},
  { 'level': 1, 'available': 4, 'used': 0, 'remaining': 3},
  { 'level': 2, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 3, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 4, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 5, 'available': 2, 'used': 0, 'remaining': 0},
  { 'level': 6, 'available': 1, 'used': 0, 'remaining': 0},
  { 'level': 7, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 8, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 9, 'available': 0, 'used': 0, 'remaining': 0}
]

const lvl12 = [
  { 'level': "Wizard Level:", 'available': 12},
  { 'level': "Level", 'available': "Total", 'used': "Used", 'remaining': "Remaining"},
  { 'level': 1, 'available': 4, 'used': 0, 'remaining': 3},
  { 'level': 2, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 3, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 4, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 5, 'available': 2, 'used': 0, 'remaining': 0},
  { 'level': 6, 'available': 1, 'used': 0, 'remaining': 0},
  { 'level': 7, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 8, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 9, 'available': 0, 'used': 0, 'remaining': 0}
]

const lvl13 = [
  { 'level': "Wizard Level:", 'available': 13},
  { 'level': "Level", 'available': "Total", 'used': "Used", 'remaining': "Remaining"},
  { 'level': 1, 'available': 4, 'used': 0, 'remaining': 3},
  { 'level': 2, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 3, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 4, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 5, 'available': 2, 'used': 0, 'remaining': 0},
  { 'level': 6, 'available': 1, 'used': 0, 'remaining': 0},
  { 'level': 7, 'available': 1, 'used': 0, 'remaining': 0},
  { 'level': 8, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 9, 'available': 0, 'used': 0, 'remaining': 0}
]

const lvl14 = [
  { 'level': "Wizard Level:", 'available': 14},
  { 'level': "Level", 'available': "Total", 'used': "Used", 'remaining': "Remaining"},
  { 'level': 1, 'available': 4, 'used': 0, 'remaining': 3},
  { 'level': 2, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 3, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 4, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 5, 'available': 2, 'used': 0, 'remaining': 0},
  { 'level': 6, 'available': 1, 'used': 0, 'remaining': 0},
  { 'level': 7, 'available': 1, 'used': 0, 'remaining': 0},
  { 'level': 8, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 9, 'available': 0, 'used': 0, 'remaining': 0}
]

const lvl15 = [
  { 'level': "Wizard Level:", 'available': 15},
  { 'level': "Level", 'available': "Total", 'used': "Used", 'remaining': "Remaining"},
  { 'level': 1, 'available': 4, 'used': 0, 'remaining': 3},
  { 'level': 2, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 3, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 4, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 5, 'available': 2, 'used': 0, 'remaining': 0},
  { 'level': 6, 'available': 1, 'used': 0, 'remaining': 0},
  { 'level': 7, 'available': 1, 'used': 0, 'remaining': 0},
  { 'level': 8, 'available': 1, 'used': 0, 'remaining': 0},
  { 'level': 9, 'available': 0, 'used': 0, 'remaining': 0}
]

const lvl16 = [
  { 'level': "Wizard Level:", 'available': 16},
  { 'level': "Level", 'available': "Total", 'used': "Used", 'remaining': "Remaining"},
  { 'level': 1, 'available': 4, 'used': 0, 'remaining': 3},
  { 'level': 2, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 3, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 4, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 5, 'available': 2, 'used': 0, 'remaining': 0},
  { 'level': 6, 'available': 1, 'used': 0, 'remaining': 0},
  { 'level': 7, 'available': 1, 'used': 0, 'remaining': 0},
  { 'level': 8, 'available': 1, 'used': 0, 'remaining': 0},
  { 'level': 9, 'available': 0, 'used': 0, 'remaining': 0}
]

const lvl17 = [
  { 'level': "Wizard Level:", 'available': 17},
  { 'level': "Level", 'available': "Total", 'used': "Used", 'remaining': "Remaining"},
  { 'level': 1, 'available': 4, 'used': 0, 'remaining': 3},
  { 'level': 2, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 3, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 4, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 5, 'available': 2, 'used': 0, 'remaining': 0},
  { 'level': 6, 'available': 1, 'used': 0, 'remaining': 0},
  { 'level': 7, 'available': 1, 'used': 0, 'remaining': 0},
  { 'level': 8, 'available': 1, 'used': 0, 'remaining': 0},
  { 'level': 9, 'available': 1, 'used': 0, 'remaining': 0}
]

const lvl18 = [
  { 'level': "Wizard Level:", 'available': 18},
  { 'level': "Level", 'available': "Total", 'used': "Used", 'remaining': "Remaining"},
  { 'level': 1, 'available': 4, 'used': 0, 'remaining': 3},
  { 'level': 2, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 3, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 4, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 5, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 6, 'available': 1, 'used': 0, 'remaining': 0},
  { 'level': 7, 'available': 1, 'used': 0, 'remaining': 0},
  { 'level': 8, 'available': 1, 'used': 0, 'remaining': 0},
  { 'level': 9, 'available': 1, 'used': 0, 'remaining': 0}
]

const lvl19 = [
  { 'level': "Wizard Level:", 'available': 19},
  { 'level': "Level", 'available': "Total", 'used': "Used", 'remaining': "Remaining"},
  { 'level': 1, 'available': 4, 'used': 0, 'remaining': 3},
  { 'level': 2, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 3, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 4, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 5, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 6, 'available': 2, 'used': 0, 'remaining': 0},
  { 'level': 7, 'available': 1, 'used': 0, 'remaining': 0},
  { 'level': 8, 'available': 1, 'used': 0, 'remaining': 0},
  { 'level': 9, 'available': 1, 'used': 0, 'remaining': 0}
]

const lvl20 = [
  { 'level': "Wizard Level:", 'available': 20},
  { 'level': "Level", 'available': "Total", 'used': "Used", 'remaining': "Remaining"},
  { 'level': 1, 'available': 4, 'used': 0, 'remaining': 3},
  { 'level': 2, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 3, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 4, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 5, 'available': 3, 'used': 0, 'remaining': 0},
  { 'level': 6, 'available': 2, 'used': 0, 'remaining': 0},
  { 'level': 7, 'available': 2, 'used': 0, 'remaining': 0},
  { 'level': 8, 'available': 1, 'used': 0, 'remaining': 0},
  { 'level': 9, 'available': 1, 'used': 0, 'remaining': 0}
]

let appdata = [
  { 'level': "Wizard Level:", 'available': 1},
  { 'level': "Level", 'available': "Total", 'used': "Used", 'remaining': "Remaining"},
  { 'level': 1, 'available': 2, 'used': 0, 'remaining': 2},
  { 'level': 2, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 3, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 4, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 5, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 6, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 7, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 8, 'available': 0, 'used': 0, 'remaining': 0},
  { 'level': 9, 'available': 0, 'used': 0, 'remaining': 0}
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const resetfnc = function(level) {

  switch (level) {
    case 1:
      appdata = structuredClone(lvl1)
      break
    case 2:
      appdata = structuredClone(lvl2)
      break
    case 3:
      appdata = structuredClone(lvl3)
      break
    case 4:
      appdata = structuredClone(lvl4)
      break
    case 5:
      appdata = structuredClone(lvl5)
      break
    case 6:
      appdata = structuredClone(lvl6)
      break
    case 7:
      appdata = structuredClone(lvl7)
      break
    case 8:
      appdata = structuredClone(lvl8)
      break
    case 9:
      appdata = structuredClone(lvl9)
      break
    case 10:
      appdata = structuredClone(lvl10)
      break
    case 11:
      appdata = structuredClone(lvl11)
      break
    case 12:
      appdata = structuredClone(lvl12)
      break
    case 13:
      appdata = structuredClone(lvl13)
      break
    case 14:
      appdata = structuredClone(lvl14)
      break
    case 15:
      appdata = structuredClone(lvl15)
      break
    case 16:
      appdata = structuredClone(lvl16)
      break
    case 17:
      appdata = structuredClone(lvl17)
      break
    case 18:
      appdata = structuredClone(lvl18)
      break
    case 19:
      appdata = structuredClone(lvl19)
      break
    case 20:
      appdata = structuredClone(lvl20)
      break
    default:
      console.log("Something went wrong with the reset.")
  }
  
}

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
    let parsed = JSON.parse( dataString)
    console.log(parsed)

    if (parsed.command === "loadtable") {
      if (parsed.payload > 1) {
      let datarow = appdata[parsed.payload]
      datarow.remaining = datarow.available - datarow.used
      }
      response.writeHead( 200, "OK", {'Content-Type': 'text' })
      response.end(JSON.stringify(appdata[parsed.payload]))
    } else if (parsed.command === "longrest") {
      
      let level = appdata[0].available
      
      resetfnc(level)
      response.writeHead( 200, "OK", {'Content-Type': 'text' })
      response.end(JSON.stringify({lvl: level}))
      
    }  else if (parsed.command === "levelchange") {

      resetfnc(parsed.payload)
      response.writeHead( 200, "OK", {'Content-Type': 'text' })
      response.end(JSON.stringify({lvl: parsed.payload}))

    }  else if (parsed.command === "useSpell") {
      let datarow = appdata[parsed.payload]
      if (datarow.remaining > 0) {
        datarow.used += 1
        datarow.remaining = datarow.available - datarow.used
      }
      response.writeHead( 200, "OK", {'Content-Type': 'text' })
      response.end(JSON.stringify({lvl: (parsed.payload)}))
      
    }  else if (parsed.command === "regainSpell") {
      let datarow = appdata[parsed.payload]
      if (datarow.remaining < datarow.available) {
        datarow.used -= 1
        datarow.remaining = datarow.available - datarow.used
      }
      response.writeHead( 200, "OK", {'Content-Type': 'text' })
      response.end(JSON.stringify({lvl: (parsed.payload)}))

    }  else {
      console.log("ERROR!")
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
