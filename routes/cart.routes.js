//require express package
const express = require("express");

//coonect to controlers
const cartController = require("../controllers/cart.controller");

//create router from express
const router = express.Router();

//GET route for cart page
router.get("/", cartController.getCart);

//POST route for adding cart item
router.post("/items", cartController.addCartItem);

//export modules
module.exports = router;
