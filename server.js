const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const UserRouter = require("./users/users-router.js");
const AuthRouter = require("./auth/auth-router.js");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api", UserRouter);
server.use("/api", AuthRouter);

server.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = server;
