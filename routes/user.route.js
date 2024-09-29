const express = require("express");
const {
  handleUserSignUp,
  handleUserLogIn,
} = require("../controllers/user.controller");
const router = express.Router();

router.post("/signup", handleUserSignUp);
router.post("/signin", handleUserLogIn);

module.exports = router;
