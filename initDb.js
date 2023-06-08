const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(process.env.ATLAS_URI, {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDb Connected...");
    })
    .catch((error) => {
      console.log(error.message);
    });
  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to DB");
  });
  mongoose.connection.on("error", function (err) {
    console.log("Mongoose default connection has occured " + err + " error");
  });
  mongoose.connection.on("error", (err) => {
    console.log(err.message);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected from DB");
  });
  /*process.on("SIGTERM", function () {
  mongoose.connection.close(function () {
    console.log(
      "Mongoose default connection is disconnected due to application termination"
    );
    process.exit(0);
  });
});*/
  process.on("SIGINT", () => {
    console.log(
      "Mongoose default connection is disconnected due to application termination"
    );
    process.exit(0);
  });
};
