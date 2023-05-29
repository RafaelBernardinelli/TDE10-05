const express = require("express");

const lists = require("./routes/lists");
const users = require("./routes/users");

const server = express();
server.use(express.json());

server.use(lists.router);
server.use(users.router);

module.exports = { server };
