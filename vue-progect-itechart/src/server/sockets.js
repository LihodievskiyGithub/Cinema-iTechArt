const { Server } = require("socket.io");
const auth = require("./services/auth");
const ticketService = require("./services/ticket");
const _ = require("lodash");

let io;
function init(server) {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:8080", "*", "http://127.0.0.1:5500"],
    },
  });
  io.use(authorize);
  declareEvents();
}

function declareEvents() {
  io.on("connection", (socket) => {
    console.log("Socket connection", socket.handshake.data);
    socket.join(socket.handshake.data.user._id.toString());
    socket.on("join-session", (data) => {
      joinRoomHandler(data, socket);
    });
    socket.on("reserve-seat", async (data) => {
      try {
        const ticket = await ticketService.reserveTicket(
          data.ticketId,
          socket.handshake.data.user._id,
          data.startDate,
          data.sessionId
        );

        const timer = await ticketService.createTimer(
          socket.handshake.data.user._id,
          data.startDate,
          data.sessionId
        );

        io.to(data.sessionId).emit("seat-reserved", {
          ticket,
        });

        socket.emit("timer-created", {
          timer,
        });
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("unreserve-seat", async (data) => {
      try {
        const ticket = await ticketService.unReserveTicket(
          data.ticketId,
          socket.handshake.data.user._id
        );
        const isTimerDeleted = await ticketService.removeTimer(
          socket.handshake.data.user._id,
          data.sessionId
        );
        console.log(isTimerDeleted);
        io.to(data.sessionId).emit("seat-unreserved", {
          ticket,
        });
        if (isTimerDeleted) {
          socket.emit("timer-deleted");
        }
      } catch (err) {
        console.log(err);
      }
    });
  });
}

async function authorize(socket, next) {
  const token = socket.handshake.auth.token;
  try {
    const user = await auth(token);
    if (user) {
      socket.handshake.data = {
        user,
      };
      return next();
    }
  } catch (err) {
    console.log(err);
  }

  next(new Error("Authentication error"));
  console.error("Authentication error");
}

async function joinRoomHandler(data, client) {
  // сlient - socket в кот лежит инфа о клиенте
  if (data.sessionId) {
    client.join(data.sessionId);
  }
  const tickets = await ticketService.getReservedTickets(
    data.sessionId,
    client.handshake.data.user._id
  );
  client.emit("reserved-tickets-sent", {
    tickets,
  });

  const timer = await ticketService.getTimer(
    data.sessionId,
    client.handshake.data.user._id
  );
  if (timer) {
    client.emit("timer-created", {
      timer,
    });
  }
}

function sendEventOnFinishedTimer({ userIds, tickets, sessionIds }) {
  console.log(userIds);
  _.uniq(userIds).forEach((id) => {
    io.to(id).emit("timer-is-out");
  });

  _.uniq(sessionIds).forEach((id) => {
    io.to(id).emit("seats-unreserved", {
      tickets,
    });
  });
}

module.exports = { init, sendEventOnFinishedTimer };
