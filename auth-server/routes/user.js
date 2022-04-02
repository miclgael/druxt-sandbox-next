const fs = require("fs");
const express = require("express");
const jwt = require("jsonwebtoken");
const { log } = require("console");

const router = express.Router();

/* GET user info */
router.get("/", function (req, res) {
  // Get full auth header, including "Bearer ...token"
  let token = req.header("authorization");

  if (!token.startsWith("Bearer ")) {
    res.sendStatus(401).send("Incorrect token format");
  } else {
    // Remove "Bearer " from string
    token = token.split(" ")[1];
  }

  if (token) {
    try {
      // validate token
      const validated = jwt.verify(token, "the_secret_key");
      res.json({
        name: validated.userInfo.name,
        email: validated.userInfo.email,
      });
      return;
    } catch (err) {
      // report issues
      console.log(err);
      res.sendStatus(401);
      res.send("Error generating user info");
      return;
    }
  } else {
    res.sendStatus(401);
    res.send("Error with request formatting");
    return;
  }
});

module.exports = router;
