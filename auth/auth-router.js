const router = require("express").Router();
const Users = require("../users/users-model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/secrets.js");

router.post("/register", (req, res) => {
  let userData = req.body;

  const hash = bcrypt.hashSync(userData.password, 12);
  userData.password = hash;

  Users.insert(userData)
    .then(user => {
      const token = genToken(user);
      res.status(200).json({ created_user: user, token: token });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);
        res.status(200).json({ user, token: token });
      } else {
        res.status(401).json({ message: "You Shall Not Pass!" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

function genToken(user) {
  const payload = {
    userid: user.id,
    username: user.username,
    role: user.department
  };
  const options = {
    expiresIn: "1h"
  };
  const token = jwt.sign(payload, secret.jwtSecret, options);
  return token;
}

module.exports = router;
