require("dotenv").config();
const http = require("http");
const path = require("path");

const express = require("express");
const socketIO = require("socket.io");
const {Client} = require("pg");

const ItemService = require("./services/ItemService");
const UserService = require("./services/UserService");
const UserRepository = require("./repository/UserRepository");
const cleanup = require("./cleanup");
const ItemRepository = require("./repository/ItemRepository");

const PORT = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000/",
    methods: ["GET", "POST"],
  },
});

const connection = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

connection.connect();

const userRepository = new UserRepository(connection);
const itemRepository = new ItemRepository(connection);
const userService = new UserService(userRepository);
const itemService = new ItemService(itemRepository);

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "client", "build", "index.html")));

app.get("/create-user", (req, res) => {
  userService.createUser().then((id) => {
    res.status(201).send({id});
  });
});

io.on("connection", (socket) => {
  socket.on("add item", ({item, userId}) => {
    itemService.addItem(item, userId).then((status) => {
      if (status === "success")
        itemService.getItems(userId).then((items) => {
          socket.emit("items", items);
        });
    });
  });

  socket.on("get items", ({userId}) => {
    itemService.getItems(userId).then((items) => {
      socket.emit("items", items);
    });
  });

  socket.on("delete item", ({itemId, userId}) => {
    itemService.deleteItem(itemId, userId).then((status) => {
      if (status === "success") {
        itemService.getItems(userId).then((items) => socket.emit("items", items));
      }
    });
  });
});

server.listen(PORT);

cleanup.Cleanup(() => {
  connection.end();
});
