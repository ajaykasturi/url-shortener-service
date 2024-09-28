const { nanoid } = require("nanoid");
const URL = require("../models/url.model");
async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortId = nanoid(8);
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitedHistory: [],
  });
  return res.render("home", { id: shortId });
  // return res.json({ id: shortId });
}
async function handleRedirectURL(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitedHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!entry)
    return res
      .status(404)
      .json({ msg: "url doesn't exist, try creating another one" });
  return res.redirect(entry.redirectURL);
}
async function handleGetURLAnalytics(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOne({ shortId });
  if (!entry) return res.status(404).json({ msg: "url doesn't exist" });
  return res.json({
    totalClicks: entry.visitedHistory.length,
    visitHistory: entry.visitedHistory,
  });
}
module.exports = {
  handleGenerateNewShortURL,
  handleRedirectURL,
  handleGetURLAnalytics,
};
