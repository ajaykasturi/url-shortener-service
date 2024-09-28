const express = require("express");
const URL = require("../models/url.model");
const router = express.Router();

router.get("/", async (req, res) => {
  const allUrls = await URL.find({});
  console.log(allUrls);
  res.render("home", { urls: allUrls });
});

module.exports = router;
