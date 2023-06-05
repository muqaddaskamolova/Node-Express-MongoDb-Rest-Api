const express = require("express");
const router = express.Router();
router.get("/", (req, res, next) => {
  res.send("Getting started all of the products on port");
});
router.post("/add", (req, res, next) => {
  res.send("product created");
});
router.get("/:id", (req, res, next) => {
  res.send("Getting a single product");
});
router.patch("/:id", (req, res, next) => {
  res.send("Update a single product ");
});
router.delete("/:id", (req, res, next) => {
  res.send("Delete a product");
});
module.exports = router;
