const mongoose = require("mongoose");

const DateSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
});

// моделируем пользователя из схемы
const Dates = mongoose.model("Dates", DateSchema);

module.exports = Dates;
