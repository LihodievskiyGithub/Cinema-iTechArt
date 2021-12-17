const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const SeatsSchema = new mongoose.Schema({
  row: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  hall: {
    type: ObjectId,
    required: true,
  },
  type: {
    type: String,
    enum: ["Movie Seat", "Love Seat", "Sofa Seat"],
    default: "Movie Seat",
  },
});

// моделируем пользователя из схемы
const Seats = mongoose.model("Seats", SeatsSchema);

module.exports = Seats;
