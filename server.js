// server
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
  //THIS IS APPDATA
  //appData = []


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://dragonweirdo4714:Awsome4714@cluster0.rnqdw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let collection;

let currentTotal = 0;
app.use(express.static('views'))
app.use(express.static('public'))
app.use(express.json());
//if something is encoed, decode it
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(express.json())


app.get('/data', (req, res) => {
  //let foundData = 
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify())
})

app.post('/submit', async (req, res) => {
  //console.log(req.body);
  res.writeHead(200, { 'Content-Type': 'application/json' })
  //appData.push( req.body )
  if (req.body.lastnum == "Add") {
    currentTotal = currentTotal + Number(req.body.firstnum);
  }
  if (req.body.lastnum == "Sub") {
    currentTotal = currentTotal - Number(req.body.firstnum);
  }
  if (req.body.lastnum == "Mult") {
    currentTotal = currentTotal * Number(req.body.firstnum);
  }
  if (req.body.lastnum == "Div") {
    currentTotal = currentTotal / Number(req.body.firstnum);
  }
  let newValues = { 'firstnum': Number(req.body.firstnum), 'lastnum': req.body.lastnum, 'total': currentTotal };
  //appData.push({ 'firstnum': Number(req.body.firstnum), 'lastnum': req.body.lastnum, 'total': currentTotal });
  let result =  await collection.insertOne(newValues);
  res.end(JSON.stringify(newValues));
})

app.post('/kill', async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  
  //console.log(currentTotal);
  //appdata.pop();
  currentTotal = appData[appData.length-1].total;
  //how do you just make current total the one in the data before it?
  //console.log(currentTotal);
  
  //console.log(req.body);
  
  //appData.push({ 'firstnum': Number(req.body.firstnum), 'lastnum': req.body.lastnum, 'total': currentTotal });
  res.end(JSON.stringify(appData))
})

/*res.writeHead(200, { 'Content-Type': 'application/json' })
let responce = req;
console.log(responce.body);
if (responce[responce.length - 1].lastnum == "Add" || responce[responce.length - 1].lastnum == "Sub"
  || responce[responce.length - 1].lastnum == "Mult" || responce[responce.length - 1].lastnum == "Div") {
  if (responce[responce.length - 1].lastnum == "Add") {
    currentTotal = Number(responce[responce.length - 1].firstnum) + currentTotal;
  }
  if (responce[responce.length - 1].lastnum == "Sub") {
    currentTotal = currentTotal - Number(responce[responce.length - 1].firstnum);
  }
  if (responce[responce.length - 1].lastnum == "Mult") {
    currentTotal = Number(responce[responce.length - 1].firstnum) * currentTotal;
  }
  if (responce[responce.length - 1].lastnum == "Div") {
    currentTotal = currentTotal / (responce[responce.length - 1].firstnum);
  }
  appData.push({ 'firstnum': responce[responce.length - 1].firstnum, 'lastnum': responce[responce.length - 1].lastnum, 'total': currentTotal });
}
//appData.push(req.body)
//res.end(JSON.stringify(appData))
 
 
})*/




async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    collection = await client.db("Project_3_Database").collection("My stuff");
    const listener = app.listen(process.env.PORT || 3000)
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);