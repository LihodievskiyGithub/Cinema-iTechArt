const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const TicketsSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true,
  },
  sessionId: {
    type: ObjectId,
    required: true,
  },
  seatId: {
    type: ObjectId,
    required: true,
  },
 
  price: {
    type: Number,
    required: true,
  },
});

// моделируем пользователя из схемы
const Tickets = mongoose.model("Tickets", TicketsSchema);

module.exports = Tickets;
