const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors());
server.use(express.json());

const birdRoutes = require("./controllers/birds");
server.use("/birds", birdRoutes);

server.get("/", (req, res) => res.send("Hi, Birdy!"));

module.exports = server;
