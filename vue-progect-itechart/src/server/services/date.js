const DateModel = require("../model/date");

function getDate() {
  return DateModel.find();
}

module.exports = {
  getDate,
};
