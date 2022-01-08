const ticketService = require("./ticket")
const sockets = require("../sockets")

setInterval(async () => {
    const data = await ticketService.removeFinishedTimers();
    sockets.sendEventOnFinishedTimer(data);
}, 10000)