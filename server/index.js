const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs").promises;
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const PORT = process.env.API_PORT;
const MONGO_URI = process.env.MONGO_URI;
const CLIENT_URI = process.env.CLIENT_URI;

const app = express();

mongoose.set("strictQuery", true);

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { message: "Too many attempts, please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply middleware immediately (synchronous)
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({ origin: CLIENT_URI, credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(generalLimiter);
app.use("/api/login", authLimiter);
app.use("/api/forgot", authLimiter);
app.use("/api/resetpassword", authLimiter);

const loadRoutes = async () => {
  try {
    const routeFiles = await fs.readdir("./routes");
    routeFiles.forEach((file) => {
      if (file.endsWith(".js")) {
        const route = require(`./routes/${file}`);
        app.use("/api", route);
      }
    });
  } catch (error) {
    console.error("Error loading routes:", error);
  }
};

const initPromise = (async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
    await loadRoutes();
  } catch (error) {
    console.error("Failed to initialize server:", error);
  }
})();

// For local development
if (PORT) {
  initPromise.then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  });
}

module.exports = app;
