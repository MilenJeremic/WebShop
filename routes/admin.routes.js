//require express package
const express = require("express");

//coonect to controlers
const adminController = require("../controllers/admin.controller");

//import middlewares
const imageUploadMiddleware = require("../middlewares/image.upload");

//create router from express
const router = express.Router();

//GET route for showing admin products
router.get("/products", adminController.getProducts);

//GET route for showing form to add admin products
router.get("/products/new", adminController.getNewProducts);

//POST route for adding/modifying admin products
router.post(
  "/products",
  imageUploadMiddleware,
  adminController.createNewProduct
);

//GET route for showing admin products
router.get("/products/:id", adminController.getUpdateProduct);

//POST route for adding/modifying admin products
router.post(
  "/products/:id",
  imageUploadMiddleware,
  adminController.updateProduct
);

//DELETE route for removing admin product
router.delete("/products/:id", adminController.deleteProduct);

//GET route for showing admin orders

//export modules
module.exports = router;
