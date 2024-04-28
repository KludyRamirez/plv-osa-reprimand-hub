const express = require("express");
const router = express.Router();
const mainController = require("../controllers/MainController");

router.post("/login", mainController.controllers.login);

router.post("/register", mainController.controllers.register);

module.exports = router;
