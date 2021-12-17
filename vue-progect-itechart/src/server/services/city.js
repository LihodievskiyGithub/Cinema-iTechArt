const CityModel = require("../model/city");



function getCity() {
  return CityModel.find();
}

module.exports = {
  getCity,
};
