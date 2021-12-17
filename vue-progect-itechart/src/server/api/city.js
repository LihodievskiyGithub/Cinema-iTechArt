const express = require("express");
const router = express.Router();
const cityService = require("../services/city");

router.get("/", function (req, res) {
  cityService.getCity().then((cities) => {
    res.json(cities);
  });
});



module.exports = router;
