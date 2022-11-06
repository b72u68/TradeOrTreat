const express = require("express");

// postingRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const transactionRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

transactionRoutes.route("/transaction/create").get(function (req, response) {
  console.log("Creating new posting...");
  let db_connect = dbo.getDb("TradeOrTreat");
  const posting = req.body.postingId;
  const buyerId = req.body.buyerId;
  const deal = req.body.deal;
  db_connect
    .collection("Transaction")
    .insertOne({ posting, buyerId, deal }, (err, res) => {
      if (err) throw err;
      response.json(res);
    });
});

transactionRoutes.route("/transaction/buy").get(function (req, res) {
  console.log("Fetching bought transaction...");
  let db_connect = dbo.getDb("TradeOrTreat");
  const currUserId = req.userId;
  db_connect
    .collection("Transaction")
    .find({ buyerId: ObjectId(currUserId) })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

transactionRoutes.route("/transaction/offer").get(function (req, res) {
  console.log("Fetching offering transaction...");
  let db_connect = dbo.getDb("TradeOrTreat");
  const currUserId = req.userId;
  let postingIds = [];
  db_connect
    .collection("Posting")
    .find({ sellerId: ObjectId(currUserId) })
    .toArray(function (err, result) {
      if (err) throw err;
      result.map((p, _) => {
        postingIds.push(p._id);
      });
    });
  db_connect
    .collection("Transaction")
    .find({ postingId: { $in: postingIds } })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = postingRoutes;
