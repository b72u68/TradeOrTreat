const express = require("express");
const {
  sendFinishTransaction,
  sendConfirmTransaction,
} = require("./messageSystem");

// postingRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const messageRoutes = express.Router();

messageRoutes.route("/message/confirm").get(function (req, response) {
  console.log("Sending confirm message...");
  const offer = req.body.offer;
  const deal = req.body.deal;
  const seller = req.body.seller;
  const buyer = req.body.buyer;
  const result = sendConfirmTransaction(offer, deal, seller, buyer);
  response.json(result);
});

messageRoutes.route("/message/finish").get(function (req, response) {
  console.log("Sending finishing message...");
  const offer = req.body.offer;
  const deal = req.body.deal;
  const seller = req.body.seller;
  const buyer = req.body.buyer;
  const resutlt = sendFinishTransaction(offer, deal, seller, buyer);
  response.json(result);
});

module.exports = messageRoutes;
