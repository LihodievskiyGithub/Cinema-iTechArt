const mongoose = require("mongoose");

const SessionsSchema = new mongoose.Schema({
  cinema: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cinema",
  },
  time: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  hall: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

// моделируем пользователя из схемы
const Sessions = mongoose.model("movie_sessions", SessionsSchema);

module.exports = Sessions;
