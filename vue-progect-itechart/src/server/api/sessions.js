const express = require("express");
const router = express.Router();
const movieSessionsService = require("../services/sessions");
const adminGuard = require("../middlewares/adminGuard")


router.get("/", function (req, res) {
  movieSessionsService.getSessions(req.query.movieId).then((sessions) => {
    res.json(sessions);
  });
});

router.get("/:id", function (req, res) {
  movieSessionsService.getSessionById(req.params.id).then((sessions) => {
    res.json(sessions);
  });
});

router.post("/add", adminGuard, function (req, res) {
  movieSessionsService
    .addSession(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/delete/:id", adminGuard, function (req, res) {
  const id = req.params.id;
  movieSessionsService
    .deleteSession(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// router.delete("/delete/:id", function (req, res) {
//   const id = req.params.id;
//   moviesServices
//     .deleteMovie(id)
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

module.exports = router;