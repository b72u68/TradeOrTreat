const express = require("express");

// postingRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const postingRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

postingRoutes.route("/posting").get(function (req, res) {
  console.log("Fetching postings...");
  let db_connect = dbo.getDb("TradeOrTreat");
  db_connect
    .collection("Posting")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

postingRoutes.route("/posting/create").get(function (req, response) {
  console.log("Creating new posting...");
  let db_connect = dbo.getDb("TradeOrTreat");
  db_connect.collection("Posting").insertOne(req.body.posting, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

module.exports = postingRoutes;
