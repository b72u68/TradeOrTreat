const express = require("express");
const {
  sendFinishTransaction,
  sendConfirmTransaction,
} = require("./messageSystem");

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
  const offer = req.body.posting.offer;
  const deal = req.body.deal;
  const seller = req.body.posting.seller;
  const buyer = req.body.buyer;
  const location = req.body.posting.location;
  db_connect
    .collection("Transaction")
    .insertOne({ offer, deal, seller, buyer, location }, (err, res) => {
      if (err) throw err;
      response.json(res);
      sendConfirmTransaction(offer, deal, seller, buyer);
    });
});

transactionRoutes.route("/transaction/user/:id").get(function (req, res) {
  console.log("Fetching user transaction...");
  let db_connect = dbo.getDb("TradeOrTreat");
  db_connect
    .collection("Transaction")
    .find({ buyer: { id: ObjectId(id) } }, { seller: { id: ObjectId(id) } })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

transactionRoutes.route("/transaction/complete/:id").get(function (req, res) {
  console.log("Finishing transaction...");
  let db_connect = dbo.getDb("TradeOrTreat");
  db_connect
    .collection("Transaction")
    .find({ _id: ObjectId(id) })
    .toArray(function (err, result) {
      if (err) throw err;
      const offer = result.offer;
      const deal = result.deal;
      const seller = result.seller;
      const buyer = result.buyer;
      res.json(result);
      sendFinishTransaction(offer, deal, seller, buyer);
    });
});

module.exports = transactionRoutes;
