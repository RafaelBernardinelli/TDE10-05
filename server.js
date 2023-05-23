const express = require('express')

const lists = require("./routes/lists")

const server = express()
server.use(express.json())

server.use(lists.router)

module.exports = {
    server
}