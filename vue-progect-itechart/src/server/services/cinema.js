const CinemaModel = require("../model/cinema");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

function getCinemas(cityId) {
  const query = {};
  if (cityId) {
    query.cityId = ObjectId(cityId);
  }
  return CinemaModel.find(query);
}
module.exports = {
  getCinemas,
};
