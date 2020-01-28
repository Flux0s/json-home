var socketIO = require("socket.io");
const events = require("events");
const socketEmitter = new events.EventEmitter();

function initialize(server) {
  let io = socketIO(server);
  socketEmitter.on("test", (data) => {
    console.log("Socket.io event captured!");
  });
}

module.exports = { initialize, socketEmitter };
