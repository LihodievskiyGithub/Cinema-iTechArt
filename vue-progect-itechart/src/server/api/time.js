const express = require("express");
const router = express.Router();
const timeService = require("../services/time");

router.get("/", function (req, res) {
  timeService.getTime().then((times) => {
    res.json(times);
  });
});

module.exports = router;
