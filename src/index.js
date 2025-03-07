const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ["polling"],  // Force long polling (No WebSockets on Vercel)
  }
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("message", (msg) => {
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get("/",(req,res)=>{
  res.send("hello")
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
