//impost User model
const Product = require("../models/product.model");

//function to get products page
async function getProducts(req, res, next) {
  try {
    const products = await Product.findAll();
    res.render("admin/products/all-products", { products: products });
  } catch (error) {
    next(error);
    return;
  }
}

//function to get new product page
function getNewProducts(req, res) {
  res.render("admin/products/new-product");
}

//function to create new product
async function createNewProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
}

async function getUpdateProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    res.render("admin/products/update-product", { product: product });
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  if (req.file) {
    product.replaceImage(req.file.filename);
  }

  try {
    await product.save();
    res.redirect("/admin/products");
  } catch (error) {
    next(error);
    return;
  }
}

async function deleteProduct(req, res, next) {
  let product;

  try {
    product = await Product.findById(req.params.id);
    await product.remove();
  } catch (error) {
    next(error);
    return;
  }

  res.json({ message: "Deleted product." });
}

module.exports = {
  getProducts: getProducts,
  getNewProducts: getNewProducts,
  createNewProduct: createNewProduct,
  getUpdateProduct: getUpdateProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
};
