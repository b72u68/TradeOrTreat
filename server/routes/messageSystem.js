const accountSid = "ACc8305982c710a57b3c1d64237fde898f";
const authToken = "501fcb474647a710dc725c2fa6fc024d";
const client = require("twilio")(accountSid, authToken);

const TWILLIO_NUMBER = "+19016574696";

function sendConfirmTransaction(offer, deal, seller, buyer) {
  client.messages
    .create({
      body: `\nUser ${buyer.name} had made an offer to your candy trade: ${offer.amount} ${offer.name} for ${deal.amount} ${deal.name}.\nPlease contact ${buyer.name} at this number: ${buyer.number}.`,
      from: TWILLIO_NUMBER,
      to: seller.number,
    })
    .then((message) => console.log(message.sid));
}

function sendFinishTransaction(offer, deal, seller, buyer) {
  client.messages
    .create({
      body: `\nYour candy trade "${offer.amount} ${offer.name} for ${deal.amount} ${deal.name}" with user ${buyer.name} is completed!`,
      from: TWILLIO_NUMBER,
      to: seller.number,
    })
    .then((message) => console.log(message.sid));

  client.messages
    .create({
      body: `\nYour candy trade "${offer.amount} ${offer.name} for ${deal.amount} ${deal.name}" with user ${seller.name} is completed!`,
      from: TWILLIO_NUMBER,
      to: buyer.number,
    })
    .then((message) => console.log(message.sid));
}

module.exports = {
  sendConfirmTransaction,
  sendFinishTransaction,
};
