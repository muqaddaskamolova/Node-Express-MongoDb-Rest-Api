const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const ProductRoute = require("./routes/product.route");
//const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));
const createError = require("http-errors");
//const dotenv = require("dotenv");
//dotenv.config();
//console.log(dotenv.parsed);
/*
const chalk = require("chalk");
const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;
/*
const connect = async () => {
  try {
    await mongoose.connect(your DB url);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};
*/
//const uri = "mongodb://127.0.0.1:27017/products";

//INIATIALIZE DB
require("./initDb")();
//
app.all("/test", (req, res) => {
  //console.log(req.query);
  // res.send(req.query);
  console.log(req.body);
  res.send(req.body);
});
app.all("/test/:id/:name", (req, res) => {
  console.log(req.params);
  res.send(req.params);
});

app.use("/products", ProductRoute);

app.use((req, res, next) => {
  // const err = new Error("Not found");
  // err.status = 404;
  // next(err);
  next(createError(404, "Not Found"));
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
APP_PORT = 3000;
const PORT = process.env.PORT || APP_PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
