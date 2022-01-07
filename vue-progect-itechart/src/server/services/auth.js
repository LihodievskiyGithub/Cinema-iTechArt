const User = require("../model/User");
const jwt = require("jsonwebtoken");

module.exports = async function (token) {
  const decoded = await jwt.verify(token, "secretkey");
    const user = await User.findOne({ _id: decoded.userId });
    return user;
};
