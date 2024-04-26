const express = require("express");
const router = express.Router();
const mainController = require("../controllers/MainController");
const validator = require("express-joi-validation").createValidator({});

const {
  loginValidator,
  registerValidator,
} = require("../middlewares/Validators");

router.post(
  "/login",
  //   validator.body(loginValidator),
  mainController.controllers.Login
);

router.post(
  "/register",
  //   validator.body(registerValidator),
  mainController.controllers.Register
);

module.exports = router;
