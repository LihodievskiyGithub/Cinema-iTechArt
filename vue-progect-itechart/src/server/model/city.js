const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: true,
  },
});

// моделируем пользователя из схемы
const City = mongoose.model("Cities", CitySchema);

module.exports = City;
