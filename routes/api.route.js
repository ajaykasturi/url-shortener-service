const express = require("express");
const urlRoute = require("./url.route");
const userRoute = require("./user.route");
const {
  restrictToLoggedInUserOnly,
} = require("../middlewares/auth.middleware");
const router = express.Router();

router.use("/url", restrictToLoggedInUserOnly, urlRoute);
router.use("/user", userRoute);

module.exports = router;
