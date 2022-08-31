//require express package
const express = require("express");

//create router from express
const router = express.Router();

//GET route for signup
router.get("/", function (req, res) {
  res.redirect("/products");
});

//GET route for 401
router.get("/401", function (req, res) {
  res.status(401).render("shared/401");
});

//GET route for 403
router.get("/403", function (req, res) {
  res.status(403).render("shared/403");
});

//export modules
module.exports = router;
