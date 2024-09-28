const express = require("express");
const urlRoute = require("./url.route");

const router = express.Router();

router.use("/url", urlRoute);

module.exports = router;
