const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const itemService = require("./services/itemService");
const path = require("path")


const app = express()

const server = http.createServer(app)
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:3000/",
        methods: ["GET", "POST"]
    }
})
const PORT = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, "..", "build")))

app.use(express.static(path.join(__dirname, "..", "public")))

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "client", "build","index.html")))

io.on("connection", socket => {

    socket.on("add item", item => {
        itemService
            .addItem(item)
            .then(status => {
                if(status === "success")
                    itemService
                        .getItems()
                        .then(items => { 
                            socket.emit("items", items)
                        })
            })
    })

    socket.on("get items", () => {
        itemService
            .getItems()
            .then(items => {
                socket.emit("items", items)
            })
    })

    socket.on("delete item", (id) => {
        itemService
            .deleteItem(id)
            .then(status => {
                if(status === "success"){
                    itemService
                        .getItems()
                        .then(items => socket.emit("items", items))
                }
            })
    })
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))