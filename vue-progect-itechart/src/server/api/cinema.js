const express = require("express");
const router = express.Router();
const cinemaService = require("../services/cinema");

router.get("/", function (req, res) {
  cinemaService.getCinemas(req.query.cityId).then((cinemas) => {
    res.json(cinemas);
  });
});

module.exports = router;
