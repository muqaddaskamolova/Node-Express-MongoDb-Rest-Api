const mongoose = require("mongoose");
const Schema = mongoose.Schema();
/*
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
*/

const productSchema = new mongoose.Schema({
  //_id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
//module.exports = mongoose.model("Product", productSchema);
