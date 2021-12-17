const express = require("express");
const router = express.Router();
const dateService = require("../services/date");

router.get("/", function (req, res) {
  dateService.getDate().then((dates) => {
    res.json(dates);
  });
});

module.exports = router;
