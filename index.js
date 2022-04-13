// const { Socket } = require("engine.io");
const express = require("express");
const path = require("path");
const app = express();
const socketIO = require("socket.io");
// const { message } = require("statuses");

app.use("/sala1", express.static(path.join(__dirname, "public")));
app.use("/sala2", express.static(path.join(__dirname, "public")));

const server = app.listen(3000, () => {
  console.log("Running");
});

const messages = { sala1: [], sala2: [] };

const io = socketIO(server);

const sala1 = io.of("/sala1").on("connection", (socket) => {
  console.log("New Connection");
  socket.emit("update_messages", messages.sala1);

  socket.on("new_message", (data) => {
    messages.sala1.push(data);
    console.log(messages);
    sala1.emit("update_messages", messages.sala1);
  });
});

const sala2 = io.of("/sala2").on("connection", (socket) => {
  console.log("New Connection");
  socket.emit("update_messages", messages.sala2);

  socket.on("new_message", (data) => {
    messages.sala2.push(data);
    console.log(messages);
    sala2.emit("update_messages", messages.sala2);
  });
});

// io.on("connection", (socket) => {
//   console.log("New Connection");
//   socket.emit("update_messages", messages);

//   socket.on("new_message", (data) => {
//     messages.push(data);
//     console.log(messages);
//     io.emit("update_messages", messages);
//   });
// });
