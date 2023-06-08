const Product = require("../Models/product.model");
const createError = require("http-errors");
const mongoose = require("mongoose");
module.exports = {
  getAllProducts: async (req, res, next) => {
    try {
      const results = await Product.find({}, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  findProductById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await Product.findOne({ _id: id });
      //const product = await Product.findById(id);
      if (!product) {
        throw createError(404, "Product does not exist");
      }
      res.send(product);
      console.log(product);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Product ID"));
        return;
      }
      next(error);
    }
    //res.send("Getting a single product");
  },
  createProduct: async (req, res, next) => {
    try {
      const product = new Product({
        // _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
      });
      const result = await product.save();
      console.log(result);

      res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: product,
      });
    } catch (err) {
      console.log(err);
      res.status(201).json({
        error: err.message,
      });
      if (err.name === "ValidationError") {
        next(createError(422, err.message));
        return;
      }
      next(err);
    }
    /*
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
    });
    product
      .save()
      .then((result) => {
        console.log(result, "Product save successfully");
        res.send(result);
      })
      .catch((err) => {
        console.log(err, "Could not save Product data");
      });*/
  },
  updateProduct: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };
      const result = await Product.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Product does not exist");
      }
      res.send(result);
      console.log(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Product ID"));
      }
      next(error);
    }

    //res.send("Update a single product ");
  },
  deleteProduct: async (req, res, next) => {
    const id = req.params.id;
    try {
      // const result = await Product.deleteOne({ _id: id });
      const result = await Product.findByIdAndDelete(id);
      console.log(result);
      if (!result) {
        throw createError(404, "Product does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Product ID"));
        return;
      }
      next(error);
    }
    //res.send("Delete a product");
  },
};
