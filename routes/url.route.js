const express = require("express");
const {
  handleGenerateNewShortURL,
  handleRedirectURL,
  handleGetURLAnalytics,
} = require("../controllers/url.controller");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", handleRedirectURL);
router.get("/analytics/:shortId", handleGetURLAnalytics);

module.exports = router;
