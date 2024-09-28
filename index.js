require("dotenv").config();
const express = require("express");
const path = require("path");
const apiRoute = require("./routes/api.route");
const staticRoute = require("./routes/static.route");
const { connectToMongoDB } = require("./utils/connect");
const URL = require("./models/url.model");

const app = express();
const PORT = process.env.PORT;

connectToMongoDB(process.env.DB_URL)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("something went wrong ", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoute);
app.use("/", staticRoute);

app.get("/test", (req, res) => {
  res.json({ message: "server is healthy" });
});

app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));
