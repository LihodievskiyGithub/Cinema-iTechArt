const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const CinemaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cityId: {
    type: ObjectId,
    required: true,
  },
});

// моделируем пользователя из схемы
const Cinema = mongoose.model("Cinemas", CinemaSchema);

module.exports = Cinema;
