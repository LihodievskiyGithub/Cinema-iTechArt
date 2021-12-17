const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  // id: {
  //   type: Number,
  // },
  name: {
    type: String,
  },
  genre: {
    type: String,
  },
  rating: {
    type: String,
  },
  year: {
    type: String,
  },
  budget: {
    type: String,
  },
  boxOffice: {
    type: String,
  },
  poster: {
    type: String,
  },
  actors: {
    type: [mongoose.Mixed],
  },
  storyline: {
    type: String,
  },
});
// Создает виртуал. поле id (нет в базе даныых)
MovieSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// двнные из бд компилируется в json 
MovieSchema.set("toJSON", {
  virtuals: true, // флаг - показывает виртуальноые поля
});

// моделируем пользователя из схемы
const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;