const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
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
