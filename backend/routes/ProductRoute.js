const express = require("express");
const Product = require("../models/productModel");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductController");

const router = express.Router();

// Fecth all products from Database
router.get("/", getProducts);

// Find product by id from Database
router.get("/:id", getProduct);

// Save product in Database
router.post("/", createProduct);

// Update a product in Database
router.put("/:id", updateProduct);

// Delete a product in Database
router.delete("/:id", deleteProduct);

module.exports = router;
