const TicketModel = require("../model/ticket");
const PurchaseModel = require("../model/purchases");
const TimerModel = require("../model/reservationTimer");
const stripe = require("stripe")(
  "sk_test_51KAVAvFFaBfUXLbxj9aMMOtvdlUYAQzoeUwsUpf7X8IGa8xRlChJWyWKg8Kkrw5AnjNupSC2IK37Pe7gfnNYewjh00dVNXNEFa"
);
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const moment = require("moment");

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

  console.log(purchase.userId, userId);
  if (purchase.status !== "pending") {
    throw Error("Completed");
  }
  if (purchase.userId.toString() !== userId.toString()) {
    throw Error("It is not your purchase");
  }
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

async function buyTickets(payload, sessionId, userId) {
  const tickets = payload.tickets;
  const ticketDocs = await TicketModel.find({
    $in: tickets.map((ticket) => {
      return ObjectId(ticket._id);
    }),
  });

  const boughtTickets = ticketDocs.filter((ticket) => {
    return ticket.bought;
  });

  if (boughtTickets.lenght) {
    throw Error(`${boughtTickets.lenght} tickets are already bought`);
  }
  const additionStuff = payload.stuff;
  const additionsPrices = {
    chips: "price_1KBkQCFFaBfUXLbxSNzAOTOs",
    cola: "price_1KBkPOFFaBfUXLbxKwD5418m",
    popcorn: "price_1KBkPsFFaBfUXLbxFQa0jWec",
  };
  const additionItems = Object.entries(additionStuff)
    .map(([key, value]) => {
      return {
        price: additionsPrices[key],
        quantity: value,
      };
    })
    .filter((item) => item.quantity);

  const seatPrices = {
    7: "price_1KAZ25FFaBfUXLbxKO4B2nVE",
    10: "price_1KAZ25FFaBfUXLbxKO4B2nVE",
    15: "price_1KAZ25FFaBfUXLbxKO4B2nVE",
  };
    
  const lineItems = tickets.map((ticket) => {
    return {
      price: seatPrices[ticket.price],
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
    userId,
    additionalServices: additionStuff,
    stripe_sessionId: session.id,
    tickets: tickets,
    status: "pending",
  });

  await purchase.save();

  return session;
}

async function reserveTicket(ticketId, userId) {
  const ticket = await TicketModel.findById(ticketId);
  if (ticket.bought || ticket.reserved) {
    throw Error("Ticket reserved by another person");
  }
  ticket.reserved = true;
  ticket.userId = userId;
  return ticket.save();
}

async function createTimer(userId, startDate, sessionId) {
  const timer = await TimerModel.findOne({
    userId,
    sessionId,
  });
  if (!timer) {
    const finishedDate = moment(new Date(startDate)).add(15, "seconds").toDate();
    const newTimer = new TimerModel({
      userId,
      sessionId,
      startDate,
      finishedDate,
    });
    return newTimer.save();
  }
  return timer;
}

async function removeTimer(userId, sessionId) {
  const reservedTickets = await getReservedTickets(sessionId, userId);
  if (!reservedTickets.length) {
    await TimerModel.findOneAndDelete({
      userId,
      sessionId,
    });
    return true;
  }
  return false;
}

async function unReserveTicket(ticketId, userId) {
  const ticket = await TicketModel.findById(ticketId);
  if (!ticket.reserved) {
    throw Error("Ticket is not reserved");
  }
  if (ticket.userId.toString() !== userId.toString()) {
    throw Error("Ticket reserved by another person");
  }
  ticket.reserved = false;
  ticket.userId = null;
  return ticket.save();
}

async function getReservedTickets(sessionId, userId) {
  return TicketModel.find({
    sessionId: ObjectId(sessionId),
    userId: ObjectId(userId),
    reserved: true,
    bought: false,
  });
}

async function getTimer(sessionId, userId) {
  const timer = await TimerModel.findOne({
    userId,
    sessionId,
  });
  return timer;
}

async function removeFinishedTimers() {
  const currentDate = new Date();
  const finishedTimers = await TimerModel.find({
    finishedDate: {
      $lte: currentDate,
    }
  });
  const userIds = [];
  const tickets = [];
  const sessionIds = [];
  await Promise.all(finishedTimers.map(async (timer) => {
    userIds.push(timer.userId.toString());
    sessionIds.push(timer.sessionId.toString());
    
     const ticketDocs = await TicketModel.find(
       {
         userId: timer.userId,
         sessionId: timer.sessionId,
         reserved: true,
         bought: false,
       }
    );
    await Promise.all(ticketDocs.map(async (ticket) => {
      ticket.reserved = false;
      ticket.userId = null;
      return ticket.save();
    }))
    console.log(ticketDocs);

    tickets.push(...ticketDocs)
   }))
   await TimerModel.deleteMany({
      finishedDate: {
        $lte: currentDate,
      },
   });

  return { userIds, tickets, sessionIds };
}

module.exports = {
  getTicketBySessionId,
  buyTickets,
  completePurchase,
  reserveTicket,
  unReserveTicket,
  getReservedTickets,
  createTimer,
  removeTimer,
  getTimer,
  removeFinishedTimers,
};
