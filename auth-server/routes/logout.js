const express = require("express");
const router = express.Router();

/* POST user logout */
router.post("/", function (_req, res, _next) {
  res.sendStatus(200).json({ status: 200, message: "user logged out" });
});

module.exports = router;
