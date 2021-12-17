const express = require("express");
const router = express.Router();
const movieSessionsService = require("../services/sessions");


router.get("/", function (req, res) {
  movieSessionsService.getSessions(req.query.movieId).then((sessions) => {
    res.json(sessions);
  });
});

router.post("/add", function (req, res) {
  movieSessionsService
    .addSession(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/delete/:id", function (req, res) {
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