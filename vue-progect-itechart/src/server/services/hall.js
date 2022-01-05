const HallModel = require("../model/hall");
const SeatsModel = require("../model/seats");
const SessionModel = require("../model/sessions")
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

async function createHall(hall) {
  const hallId = new ObjectId();
  hall._id = hallId;
    // const hall = {
    //   _id: hallId,
    //   rows: [
    //     {
    //       seats: [
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //       ],
    //     },
    //     {
    //       seats: [
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //       ],
    //     },
    //     {
    //       seats: [
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //         { type: "Movie Seat" },
    //       ],
    //     },
    //     {
    //       seats: [
    //         { type: "Love Seat" },
    //         { type: "Love Seat" },
    //         { type: "Love Seat" },
    //         { type: "Love Seat" },
    //         { type: "Love Seat" },
    //         { type: "Love Seat" },
    //         { type: "Love Seat" },
    //       ],
    //     },
    //     {
    //       seats: [
    //         { type: "Sofa Seat" },
    //         { type: "Sofa Seat" },
    //         { type: "Sofa Seat" },
    //         { type: "Sofa Seat" },
    //         { type: "Sofa Seat" },
    //         { type: "Sofa Seat" },
    //         { type: "Sofa Seat" },
    //       ],
    //     },
    //   ],
    //   };
    const rows = [];
    for (const [id, row] of hall.rows.entries()) {
        const seats = [];
        await Promise.all(
          row.seats.map(async (seat, idx) => {
            const seatDoc = new SeatsModel({
              hall: hallId,
              row: id,
              number: idx,
              type: seat.type,
            });
            const savedSeat = await seatDoc.save();
            seats.push(savedSeat._id);
          })
        );
        rows.push(seats);
    }
//   await Promise.all(
//     hall.rows.map(async (row, id) => {
//       const seats = [];
//       await Promise.all(
//         row.seats.map(async (seat, idx) => {
//           const seatDoc = new SeatsModel({
//             hall: hallId,
//             row: id,
//             number: idx,
//             type: seat.type,
//           });
//           const savedSeat = await seatDoc.save();
//           seats.push(savedSeat._id);
//         })
//       );
//       rows.push(seats);
//     })
//   );
    const hallDoc = new HallModel({
      ...hall,
    rows: rows,
    // cinema: ObjectId("61b31b5addc22af9b1b67d94"),
    // name: "Crocus",
    _id: hallId,
  });

  return hallDoc.save();
}

function getHall(id) {
    return HallModel.aggregate([
      {
        $match: { _id: ObjectId(id) },
      },
      { $unwind: "$rows" },
      {
        $lookup: {
          from: "seats",
          localField: "rows",
          foreignField: "_id",
          as: "rows",
        },
      },
      {
        $group: {
          _id: "$_id",
          rows: { $push: "$rows" },
          name: { $first: "$name" },
          cinema: { $first: "$cinema" },
        },
      },
    ]).then((arr) => {
        return arr[0];
    })
}

function getHallsByCinemaId(cinemaId) {
  return HallModel.find({cinema: ObjectId(cinemaId)})
}

async function getHallBySessionId(sessionId) {
  const session = await SessionModel.findById(sessionId);
  console.log(session);
  return HallModel.aggregate([
    {
      $match: { _id: ObjectId(session.hall) },
    },
    { $unwind: "$rows" },
    {
      $lookup: {
        from: "seats",
        localField: "rows",
        foreignField: "_id",
        as: "rows",
      },
    },
    {
      $group: {
        _id: "$_id",
        rows: { $push: "$rows" },
        name: { $first: "$name" },
        cinema: { $first: "$cinema" },
      },
    },
  ]).then((arr) => {
    return arr[0];
  });
}

module.exports = {
  createHall,
  getHall,
  getHallsByCinemaId,
  getHallBySessionId,
};
