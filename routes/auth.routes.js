//require express package
const express = require("express");

//coonect to controlers
const authController = require("../controllers/auth.controller");

//create router from express
const router = express.Router();

//GET route for signup
router.get("/signup", authController.getSignup);

//POST route for signup
router.post("/signup", authController.signup);

//GET route for login
router.get("/login", authController.getLogin);

//POST route for login
router.post("/login", authController.login);

//POSTroute for logout
router.post("/logout", authController.logout);

//export modules
module.exports = router;
