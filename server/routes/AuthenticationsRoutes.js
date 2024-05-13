const express = require("express");
const router = express.Router();
const mainController = require("../controllers/MainController");

const { VerifyJWT } = require("../middlewares/VerifyJWT");

const auth = VerifyJWT;

router.post("/login", mainController.controllers.login);

router.post("/register", mainController.controllers.register);

router.post("/change-email", auth, mainController.controllers.changeEmail);

router.post(
  "/change-password",
  auth,
  mainController.controllers.changePassword
);

module.exports = router;
