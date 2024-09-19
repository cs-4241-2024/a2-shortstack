const {MongoClient, ServerApiVersion} = require("mongodb");
const {uri} = require("./private.js");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient
(
  uri,
  {
    serverApi:
    {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  }
);

/**
 * Formats a log message to include message source.
 * 
 * @param {string} src Message source.
 * @param {string} message Base log message.
 * @returns Formatted log message.
 */
const formatLog = function(src, message)
{
  return `[${src.toUpperCase()}] → ${message}`;
}

const DB_CreateDocument = async function(document, collection, database = "laptop-loans")
{
  try
  {
    const mongoDatabase = client.db(database);
    const mongoCollection = mongoDatabase.collection(collection);

    const result = await mongoCollection.insertOne(document);

    console.log(formatLog("DB", `Document successfully inserted with ID ${result.insertedId}`));
  }
  catch
  {
    console.log(formatLog("DB", `ERROR creating new document in ${database}.${collection}`));
  }
}

const DB_UpdateDocument = async function(document, collection, database = "laptop-loans")
{
  try
  {
    const mongoDatabase = client.db(database);
    const mongoCollection = mongoDatabase.collection(collection);

    const filter = {id: document.id};
    const options = {upsert: true};

    const update =
    {
      $set:
      {
        firstname: document.firstname,
        lastname: document.lastname,
        dup: document.dup
      }
    }

    const result = await mongoCollection.updateOne(filter, update, options);

    console.log(formatLog("DB", `${result.modifiedCount} documents successfully updated`));
  }
  catch
  {
    console.log(formatLog("DB", `ERROR updating document in ${database}.${collection}`));
  }
}

const DB_DeleteDocument = async function(document, collection, database = "laptop-loans")
{
  try
  {
    const mongoDatabase = client.db(database);
    const mongoCollection = mongoDatabase.collection(collection);

    const filter = {id: document.id};

    const result = await mongoCollection.deleteOne(filter);

    console.log(formatLog("DB", `${result.deletedCount} documents successfully deleted`));
  }
  catch
  {
    console.log(formatLog("DB", `ERROR deleting document in ${database}.${collection}`));
  }
}

const DB_Close = async function()
{
  await client.close();
}

module.exports = {DB_CreateDocument, DB_UpdateDocument, DB_DeleteDocument, DB_Close};