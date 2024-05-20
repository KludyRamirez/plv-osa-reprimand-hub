const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.error("Database connection failed!", err);
  });

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URI,
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));

const routeFiles = fs.readdirSync("./routes");
routeFiles.forEach((file) => {
  if (file.endsWith(".js")) {
    const route = require(`./routes/${file}`);
    app.use("/api", route);
  }
});

// Export the app
module.exports = app;
