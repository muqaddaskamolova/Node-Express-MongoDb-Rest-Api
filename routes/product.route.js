const express = require("express");
const router = express.Router();
//const Product = require("../Models/product.model");

const ProductController = require("../Controller/product.controller");

router.get("/", ProductController.getAllProducts);
router.post("/add", ProductController.createProduct);
router.get("/:id", ProductController.findProductById);
router.patch("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);
module.exports = router;
