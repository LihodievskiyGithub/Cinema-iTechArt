const express = require("express");
const router = express.Router();
const hallService = require("../services/hall");

router.post("/add", function (req, res) {
  hallService.createHall(req.body).then(() => {
    res.json();
  });
});

router.get("/:id", function (req, res) {
  hallService.getHall(req.params.id).then((hall) => {
    res.json(hall);
  });
});

router.get("/cinema/:id", function (req, res) {
  hallService.getHallsByCinemaId(req.params.id).then((hall) => {
    res.json(hall);
  });
});

router.get("/session/:id", function (req, res) {
  console.log(req.user)
  hallService.getHallBySessionId(req.params.id).then((hall) => {
    res.json(hall);
  });
});

module.exports = router;
