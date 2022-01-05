const User = require("../model/User");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    let token = req.headers.token; //token
  jwt.verify(token, "secretkey", (err, decoded) => {
      if (err) return next();


    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err)  return next();
        req.user = user;
        next();
    });
  });
};
