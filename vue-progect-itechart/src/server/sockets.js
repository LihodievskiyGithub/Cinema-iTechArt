const { Server } = require("socket.io");
const auth = require("./services/auth");
const ticketService = require("./services/ticket");

let io;
function init(server) {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:8080"],
    },
  });
  io.use(authorize);
  declareEvents();
}

function declareEvents() {
  io.on("connection", (socket) => {
    console.log("Socket connection", socket.handshake.data);
    socket.emit("hello");
    socket.on("join-session", (data) => {
      console.log("join-session");
      joinRoomHandler(data, socket);
    });
    socket.on("reserve-seat", async (data) => {
      try {
        const ticket = await ticketService.reserveTicket(
          data.ticketId,
          socket.handshake.data.user._id
        );
        io.to(data.sessionId).emit("seat-reserved", {
          ticket,
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
        io.to(data.sessionId).emit("seat-unreserved", {
          ticket,
        });
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
    client.emit('reserved-tickets-sent', {
        tickets,
    })
}

module.exports = { init };
