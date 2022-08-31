//import express-session package
const expressSession = require("express-session");

//import mongodb session connection
const mongoDbStore = require("connect-mongodb-session");

//creating store for session
function createSessionStore() {
  const mongoDBStore = mongoDbStore(expressSession);

  const store = new mongoDBStore({
    uri: "mongodb://localhost:27017",
    databaseName: "webShop",
    collection: "sessions",
  });

  return store;
}

//using created store to config session
function createSessionConfig() {
  return {
    secret: "session-password",
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
    },
  };
}

module.exports = createSessionConfig;
