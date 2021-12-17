const TimeSchema = require("../model/time");

function getTime() {
  return TimeSchema.find();
}

module.exports = {
  getTime,
};
