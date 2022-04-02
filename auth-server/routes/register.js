const fs = require("fs");
const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

/* POST user register */
router.post("/", function (req, res, next) {
  if (req.body) {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      // You'll want to encrypt the password in a live app
    };

    if (!user.name) res.sendStatus(401) && res.send("Name is required");
    if (!user.email) res.sendStatus(401) && res.send("Email is required");
    if (!user.password) res.sendStatus(401) && res.send("Password is required");

    const data = JSON.stringify(user, null, 2);

    fs.writeFile("db/user.json", data, (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      } else {
        // eslint-disable-next-line no-console
        console.log("Added user to user.json");
      }
    });
    // The secret key should be an environment variable in a live app
    const token = jwt.sign({ user }, "the_secret_key");
    res.json({
      token,
      email: user.email,
      name: user.name,
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
