const MoviesModel = require("../model/movies");
const SessionModel = require("../model/sessions")
const _ = require("lodash")
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


function addMovie(data) {
    const movie = new MoviesModel(data);
      return movie
      .save();
}
async function getMovies(searchQuery, sort, filters) {
    // в фигурных скобках далее будет фильтрация
  const query = {};
  if (searchQuery) {
           query.$or = [
             { name: new RegExp(searchQuery, "gi") },
             { "actors.name": new RegExp(searchQuery, "gi") },
           ];
  }

   _.forEach(filters, (val, key) => {
     if (!val) delete filters[key];
     else {
       filters[key] = ObjectId(val)
     }
  })
  // проверяет есть ли что-то в объекте
  if (!_.isEmpty(filters)) {
    const sessions = await SessionModel.find(filters);
    console.log(sessions)
    // id фильмов в переменной
    const movieIds = sessions.map(session => session.movie);
    query._id = { $in: movieIds };
  }
    return MoviesModel.find(query).sort( sort );
}

function deleteMovie(id) {
  return MoviesModel.findByIdAndDelete(id);
}

function updateMovie(id, data) {
  // return MoviesModel.findByIdAndUpdate(id, data);
    return MoviesModel.findById(id).update(data)
}

function getMovieById(id) {
    return MoviesModel.findById(id);
}



module.exports = {
  addMovie,
  getMovies,
  deleteMovie,
  updateMovie,
  getMovieById
};
