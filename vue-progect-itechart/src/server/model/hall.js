const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const HallSchema = new mongoose.Schema({
  rows: {
    type: [mongoose.Mixed],
    required: true,
  },
  cinema: {
    type: ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
});

// моделируем пользователя из схемы
const Halls = mongoose.model("Halls", HallSchema);

module.exports = Halls;
