const fs = require("fs");
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

/* POST user login */
router.post("/", function (req, res) {
  var userDB = fs.readFileSync("./db/user.json");
  var userInfo = JSON.parse(userDB);
  if (
    req.body &&
    req.body.email === userInfo.email &&
    req.body.password === userInfo.password
  ) {
    // The secret key should be an environment variable in a live app
    const token = jwt.sign({ userInfo }, "the_secret_key");
    res.json({
      token,
      email: userInfo.email,
      name: userInfo.name,
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
