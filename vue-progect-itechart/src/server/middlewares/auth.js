const auth = require("../services/auth")

module.exports = async function (req, res, next) {
  let token = req.headers.token; //token
  try {
    const user = await auth(token);
    req.user = user;
    return next();
  }
  catch (err) {
    return next()
  }
};
