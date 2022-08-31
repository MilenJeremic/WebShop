//importing path package
const path = require("path");

//require express package
const express = require("express");

//require other packages/middleware
const csrf = require("csurf");
const expressSession = require("express-session");

//add session
const createSessionConfig = require("./config/session");

//require database definitions
const db = require("./database/database");

//add custom middlewares
const addCsrfTokenMiddleware = require("./middlewares/csrf.token");
const errorHandlerMiddleware = require("./middlewares/error.handler");
const checkAuthStatusMiddleware = require("./middlewares/check.auth");
const protectRoutesMiddleware = require("./middlewares/protect.routes");
const cartMiddleware = require("./middlewares/cart");

//add created routes
const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.routes");
const sharedRoutes = require("./routes/shared.routes");
const adminRoutes = require("./routes/admin.routes");
const cartRoutes = require("./routes/cart.routes");

//use express package
const app = express();

//use ejs package
app.set("view engine", "ejs"); //declare ejs engine to use
app.set("views", path.join(__dirname, "views")); //declare path to views folder

//adding middleware
app.use(express.static("public")); // for static public folder
app.use("/products/assets", express.static("productData")); // for static image folder
app.use(express.urlencoded({ extended: false })); // for using entered data from forms
app.use(express.json()); // for using data from json

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(cartMiddleware);
app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

//use created routes
app.use(sharedRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use("/cart", cartRoutes); //adding path for cart routes
app.use(protectRoutesMiddleware); // protection for not authenticated or not admin users
app.use("/admin", adminRoutes); //adding path for admin routes

//use custom error handler
app.use(errorHandlerMiddleware);

//connecting to database
db.connectToDatabase()
  .then(function () {
    //listener for web aplication
    app.listen(5500);
  })
  .catch(function (error) {
    console.log("Failed to connect to the database");
    console.log(error);
  });
