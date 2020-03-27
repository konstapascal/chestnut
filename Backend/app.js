const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const keyRoutes = require("./routes/key-routes");
const usersRoutes = require("./routes/users-routes");

const HttpError = require("./models/http-error");

const app = express();

//extract any json coming, calls next automatically
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/keys", keyRoutes);
app.use("/api/users", usersRoutes);

//This middleware get accessed only when we do not get respone from othes before
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

//error handling. if any middleware throws error this triggers
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknow error occured" });
});

mongoose
  .connect(
    "mongodb+srv://abz:MyPass1234@chestnutcluster-pkilp.mongodb.net/chestnut?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(5000);
  })
  .catch(err => console.log(err));
