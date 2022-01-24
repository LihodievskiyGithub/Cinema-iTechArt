module.exports = async function (req, res, next) {    
    const isAdmin = req.user.isAdmin;
    if (isAdmin) {
        return next();
    }
    return res
      .status(403)
      .send({ message: "Access denied." });
};

