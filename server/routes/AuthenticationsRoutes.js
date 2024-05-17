const express = require("express");
const router = express.Router();
const mainController = require("../controllers/MainController");

const { VerifyJWT } = require("../middlewares/VerifyJWT");

const auth = VerifyJWT;

router.post("/login", mainController.controllers.login);

router.post("/forgot", mainController.controllers.forgot);

router.post("/resetpassword/:id/:token", mainController.controllers.reset);

router.post("/register", auth, mainController.controllers.register);

router.post("/change-email", auth, mainController.controllers.changeEmail);

router.post(
  "/change-password",
  auth,
  mainController.controllers.changePassword
);

module.exports = router;
