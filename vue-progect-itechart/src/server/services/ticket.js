const TicketModel = require("../model/ticket");
const PurchaseModel = require("../model/purchases");
const stripe = require("stripe")(
  "sk_test_51KAVAvFFaBfUXLbxj9aMMOtvdlUYAQzoeUwsUpf7X8IGa8xRlChJWyWKg8Kkrw5AnjNupSC2IK37Pe7gfnNYewjh00dVNXNEFa"
);
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

function getTicketBySessionId(id) {
  return TicketModel.find({
    sessionId: ObjectId(id),
  });
}

async function completePurchase(stripeSessionId, userId) {
  const session = await stripe.checkout.sessions.retrieve(stripeSessionId);
  const purchase = await PurchaseModel.findOne({
    stripe_sessionId: session.id,
  });
  console.log(purchase)
  await TicketModel.updateMany(
    {
      _id: {
        $in: purchase.tickets.map((ticket) => {
          return ObjectId(ticket._id);
        }),
      },
    },
    {
      userId,
      bought: true,
    }
  );

  purchase.status = "completed";
  purchase.save();

  return session;
}

async function buyTickets(payload, sessionId) {
  const tickets = payload.tickets;
  const additionStuff = payload.stuff;
  const additionsPrices = {
    chips: "price_1KBkQCFFaBfUXLbxSNzAOTOs",
    cola: "price_1KBkPOFFaBfUXLbxKwD5418m",
    popcorn: "price_1KBkPsFFaBfUXLbxFQa0jWec",
  };
  const additionItems = Object.entries(additionStuff).map(([key, value]) => {
    return {
      price: additionsPrices[key],
      quantity: value,
    };
  }).filter(item => item.quantity);

  const lineItems = tickets.map((ticket) => {
    return {
      price: "price_1KAZ25FFaBfUXLbxKO4B2nVE",
      quantity: 1,
    };
  });

  lineItems.push(...additionItems);
  console.log(lineItems);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    success_url: `http://localhost:8080/Reservation/${sessionId}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:8080/Reservation/${sessionId}`,
  });

  const purchase = await new PurchaseModel({
    additionalServices: additionStuff,
    stripe_sessionId: session.id,
    tickets: tickets,
    status: "pending",
  });

  await purchase.save();

  return session;
}

module.exports = {
  getTicketBySessionId,
  buyTickets,
  completePurchase,
};
