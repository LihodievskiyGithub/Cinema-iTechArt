const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const PurchaseSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true,
  },
  tickets: {
    type: [mongoose.Mixed],
  },
  additionalServices: {
    type: mongoose.Mixed,
  },
  stripe_sessionId: {
    type: String,
    required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"]
  },
});

// моделируем пользователя из схемы
const Purchase = mongoose.model("Purchase", PurchaseSchema);

module.exports = Purchase;
