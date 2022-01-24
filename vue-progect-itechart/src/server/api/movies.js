const express = require("express");
const router = express.Router();
// const MoviesModel = require("../model/movies");
const moviesServices = require("../services/movies");
const adminGuard = require("../middlewares/adminGuard");




// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
router.get("/", function (req, res) {
  const sort = {
    [req.query.sortField]: req.query.sortOrder
  };
  const filters = {
    cinema: req.query.cinema,
    city: req.query.city,
    date: req.query.date,
    time: req.query.time,
  };
    moviesServices.getMovies(req.query.query, sort, filters).then((movies) => {
      res.json(movies);
    });
});

router.post("/add", adminGuard, function (req, res) {
  moviesServices.addMovie(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
})

router.delete("/delete/:id", adminGuard,  function (req, res) {
  const id = req.params.id;
  moviesServices.deleteMovie(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    })
})

router.put("/update/:id", adminGuard, function (req, res) {
  const id = req.params.id;
  moviesServices
    .updateMovie(id, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/search", function (req, res) {
  moviesServices
    .searchMovie(req.query)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
})

router.get("/:id", function (req, res) {
    const id = req.params.id;
  moviesServices.getMovieById(id).then((movie) => {
    res.json(movie);
  });
});

// router.get("/push", function (req, res) {
//   console.log("text.push")
//   MoviesModel.insertMany(moviesArray).then(() => {
//     console.log("insert")
//     res.json(moviesArray);
//   });
// });


module.exports = router;
