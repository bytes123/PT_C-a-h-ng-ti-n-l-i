const express = require("express");

const app = express();
const http = require("http");
const bodyParser = require("body-parser");
var cors = require("cors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;
const axios = require("axios");

var cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.static("public"));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let routes = require("./route/routes"); //importing route
routes(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const { Server } = require("socket.io");
const server = http.createServer(app);

const sendMsg = async (data) => {
  await axios.post("http://localhost:8000/send_message", data);
};

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });

  socket.on("send_action", () => {
    socket.to("socket-web-app").emit("send_action");
  });

  socket.on("send_message", (data) => {
    try {
      sendMsg(data);
      socket.to("socket-web-app").emit("receive_message", data.room_id);
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
