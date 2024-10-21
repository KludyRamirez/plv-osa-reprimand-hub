const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs').promises;
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.API_PORT;
const MONGO_URI = process.env.MONGO_URI;
const CLIENT_URI = process.env.CLIENT_URI;

const app = express();
const server = http.createServer(app);

mongoose.set('strictQuery', true);

const setupMiddleware = () => {
  app.use(morgan('dev'));
  app.use(cors({ origin: CLIENT_URI, credentials: true }));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

const loadRoutes = async () => {
  try {
    const routeFiles = await fs.readdir('./routes');
    routeFiles.forEach((file) => {
      if (file.endsWith('.js')) {
        const route = require(`./routes/${file}`);
        app.use('/api', route);
      }
    });
  } catch (error) {
    console.error('Error loading routes:', error);
  }
};

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    setupMiddleware();
    await loadRoutes();

    server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      'Failed to start the server or connect to the database:',
      error
    );
  }
};

startServer();
