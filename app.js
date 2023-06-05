const express = require("express");
const mongoose = require("mongoose");
const app = express();
//const uri = "mongodb://127.0.0.1:27017/admin";
const atlasUri =
  "mongodb+srv://cluster0.ta4rxex.mongodb.net/test?retryWrites=true&w=majority/";
mongoose
  .connect(atlasUri, {
    dbName: "admin",
    user: "kamolovamuqaddas",
    pass: "Wcgm5OzyqWgT25cW",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDb Connected...");
  });
const ProductRoute = require("./routes/product.route");
app.use("/products", ProductRoute);

app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
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

PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
