const express = require("express");
const router = express.Router();
const ticketService = require("../services/ticket");
// const stripe = require("stripe")(
//   "sk_test_51KAVAvFFaBfUXLbxj9aMMOtvdlUYAQzoeUwsUpf7X8IGa8xRlChJWyWKg8Kkrw5AnjNupSC2IK37Pe7gfnNYewjh00dVNXNEFa"
// );

router.get("/session/:id", function (req, res) {
  ticketService.getTicketBySessionId(req.params.id).then((tickets) => {
    res.json(tickets);
  });
});

router.post("/buy/:sessionId", function (req, res) {
  ticketService
    .buyTickets(req.body, req.params.sessionId)
    .then((session) => {
      res.send(session);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/complete_purchase", function (req, res) {
  ticketService
    .completePurchase(req.body.stripeSessionId, req.user._id)
    .then((session) => {
      res.send(session);
    })
    .catch((err) => {
      console.log(err);
    });
})

module.exports = router;
