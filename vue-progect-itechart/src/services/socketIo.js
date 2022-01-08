import { io } from "socket.io-client";
import _ from "lodash";

const token = localStorage.getItem("token");

const socket = io("ws://localhost:3000", {
  reconnectionDelayMax: 10000,
  autoConnect: true,
  auth: {
    token,
  },
});

const handlers = {
  "seat-reserved": [],
  "seat-unreserved": [],
  "reserved-tickets-sent": [],
  "timer-created": [],
  "timer-deleted": [],
  "timer-is-out": [],
  "seats-unreserved": [],
};

socket.on("connect", () => {
  console.log(socket.id);
  socket.on("hello", () => {
    console.log("Hello");
  });

  _.forEach(handlers, (eventHandlers, eventName) => {
    socket.on(eventName, (data) => {
      eventHandlers.forEach((handler) => {
        handler(data);
      });
    });
  });

  // socket.on("seat-reserved", (data) => {
  //   handlers["seat-reserved"].forEach((handler) => {
  //     handler(data);
  //   });
  // });

  // socket.on("seat-unreserved", (data) => {
  //   handlers["seat-unreserved"].forEach((handler) => {
  //     handler(data);
  //   });
  // });

  // socket.on("reserved-tickets-sent", (data) => {
  //   handlers["reserved-tickets-sent"].forEach((handler) => {
  //     handler(data);
  //   });
  // });
});

function joinSession(sessionId) {
  socket.emit("join-session", {
    sessionId,
  });
}

function reserveSeat(ticketId, sessionId, startDate) {
  socket.emit("reserve-seat", {
    sessionId,
    ticketId,
    startDate,
  });
}

function subscribe(eventName, handler) {
  handlers[eventName].push(handler);
  return handlers[eventName].lenght - 1;
}

function unReserveSeat(ticketId, sessionId) {
  socket.emit("unreserve-seat", {
    sessionId,
    ticketId,
  });
}

export { joinSession, reserveSeat, subscribe, unReserveSeat };
