const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const io = require("socket.io")(http, {
  cors: {
    origin: "<http://localhost:8081>",
  },
});
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const generateID = () => Math.random().toString(36).substring(2, 10);

let chatRooms = [];

// Add messages when sockets open and close connections
io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("createRoom", (roomName) => {
    socket.join(roomName);
    //👇🏻 Adds the new group name to the chat rooms array
    chatRooms.unshift({ id: generateID(), roomName, messages: [] });
    //👇🏻 Returns the updated chat rooms via another event
    socket.emit("roomsList", chatRooms);
  });

  socket.on("findRoom", (id) => {
    //👇🏻 Filters the array by the ID
    let result = chatRooms.filter((room) => room.id == id);
    //👇🏻 Sends the messages to the app
    socket.emit("foundRoom", result[0].messages);
  });

  socket.on("newMessage", (data) => {
    const { room_id, message, user, timestamp } = data;
    let result = chatRooms.filter((room) => room.id == room_id);
    const newMessage = {
      id: generateID(),
      text: message,
      user,
      time: `${timestamp.hour}:${timestamp.mins}`,
    };
    console.log("New Message", newMessage);
    socket.to(result[0].name).emit("roomMessage", newMessage);
    result[0].messages.push(newMessage);

    socket.emit("roomsList", chatRooms);
    socket.emit("foundRoom", result[0].messages);
  });

  socket.on("disconnect", (reason) => {
    socket.disconnect();
    console.log(`[${socket.id}] socket disconnected - ${reason}`);
  });
});

// Broadcast the current server time as global message, every 1s
setInterval(() => {
  io.sockets.emit("time-msg", { time: new Date().toISOString() });
}, 1000);

// Show the index.html by default
app.get("/", (req, res) => res.sendFile("index.html"));
app.get("/api", (req, res) => {
  res.json(chatRooms);
});

// Start the express server
http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
