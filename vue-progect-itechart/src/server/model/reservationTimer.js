const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const TimerSchema = new mongoose.Schema({
  sessionId: {
    type: ObjectId,
    required: true,
  },
  userId: {
    type: ObjectId,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  finishedDate: {
    type: Date,
    required: true,
  },
});

// моделируем пользователя из схемы
const Timer = mongoose.model("Timers", TimerSchema);

module.exports = Timer;
