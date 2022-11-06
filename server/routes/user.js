const express = require("express");

// postingRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const userRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

userRoutes.route("/user/:id").get(function (req, response) {
  console.log("Fetching user...");
  let db_connect = dbo.getDb("TradeOrTreat");
  db_connect.collection("User").find({ _id: ObjectId(id) }, (err, res) => {
    if (err) throw err;
    response.json({ _id: res._id, name: res.name });
  });
});

userRoutes.route("/user/create").get(function (req, response) {
  console.log("Creating new posting...");
  let db_connect = dbo.getDb("TradeOrTreat");
  db_connect.collection("User").insertOne(req.body.user, (err, res) => {
    if (err) throw err;
    response.json({ _id: res._id, name: res.name });
  });
});

module.exports = userRoutes;
