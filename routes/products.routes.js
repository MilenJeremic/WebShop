//require express package
const express = require("express");

//coonect to controlers
const productsController = require("../controllers/products.controller");

//create router from express
const router = express.Router();

//GET route for products page
router.get("/products", productsController.getAllProducts);

//GET route for single product page
router.get("/products/:id", productsController.getProductDetails);

//export modules
module.exports = router;
