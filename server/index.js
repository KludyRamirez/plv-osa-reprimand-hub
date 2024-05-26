const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database is not connected.", err);
  });

app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      if (origin === process.env.CLIENT_URI) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routeFiles = fs.readdirSync("./routes");
routeFiles.forEach((file) => {
  if (file.endsWith(".js")) {
    const route = require(`./routes/${file}`);
    app.use("/api", route);
  }
});
