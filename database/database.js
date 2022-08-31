//require mongodb package
const mongodb = require("mongodb");

//create client
const MongoClient = mongodb.MongoClient;

let database;

//function that creates db and location
async function connectToDatabase() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  database = client.db("webShop");
}

//function that calls db
function getDb() {
  if (!database) {
    throw new Error("Please, connect to the database first.");
  }

  return database;
}

//export functions
module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
