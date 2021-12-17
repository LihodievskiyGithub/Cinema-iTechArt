const MovieSessionsModel = require("../model/sessions");
const DateModel = require("../model/date");
const TimeModel = require("../model/time");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

async function addSession(data) {
  const date = await DateModel.findOneAndUpdate(
    { month: data.date },
    { month: data.date },
    { new: true,  upsert: true},
    
  );
  console.log(date)
  
  const time = await TimeModel.findOneAndUpdate(
    { time: data.time },
    { time: data.time },
    { new: true, upsert: true }
  );
  const session = new MovieSessionsModel({
    ...data, date: date._id, time: time._id
  });
  return session.save();
}
function getSessions(movieId) {
  // return MovieSessionsModel.find({ movie: ObjectId(movieId) })
  return MovieSessionsModel.aggregate([
    {
      $match: { movie: ObjectId(movieId) },
    },
    {
      $lookup: {
        from: "cinemas",
        localField: "cinema",
        foreignField: "_id",
        as: "cinema",
      },
    },
    {
      $lookup: {
        from: "dates",
        localField: "date",
        foreignField: "_id",
        as: "date",
      },
    },
    {
      $lookup: {
        from: "times",
        localField: "time",
        foreignField: "_id",
        as: "time",
      },
    },
    {
      $lookup: {
        from: "cities",
        localField: "city",
        foreignField: "_id",
        as: "city",
      },
    },
    {
      $lookup: {
        from: "movies",
        localField: "movie",
        foreignField: "_id",
        as: "movie",
      },
    },
    { $unwind: "$cinema" },
    { $unwind: "$date" },
    { $unwind: "$time" },
    { $unwind: "$city" },
    { $unwind: "$movie" },
  ]);
}

function deleteSession(sessionId) {
  return MovieSessionsModel.findByIdAndDelete(sessionId);
}

module.exports = {
  addSession,
  getSessions,
  deleteSession,
};
