const express = require("express");
const router = express.Router();
const Users = require("./users-model.js");
const auth = require("../auth/auth-middleware.js");

router.get("/users", auth, (req, res) => {
  Users.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "failed to retrieve database", err });
    });
});

module.exports = router;
