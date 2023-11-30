import { Server } from "socket.io";

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
    socket.on("send-message", (message) => {
      console.log(message);
      socket.broadcast.emit("tranfer-message", message);
    });
  });
  return io;
};

export default initSocket;
