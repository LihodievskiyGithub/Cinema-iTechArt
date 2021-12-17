const mongoose = require("mongoose");

const TimeSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
});

// моделируем пользователя из схемы
const Times = mongoose.model("Times", TimeSchema);

module.exports = Times;
