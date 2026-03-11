const express = require("express");
const router = express.Router();
const mainController = require("../controllers/MainController");

const { VerifyJWT } = require("../middlewares/VerifyJWT");
const {
  loginValidator,
  forgotValidator,
  resetValidator,
  changePasswordValidator,
  changeEmailValidator,
  validate,
} = require("../middlewares/Validators");

const auth = VerifyJWT;

router.post("/login", validate(loginValidator), mainController.controllers.login);

router.get("/refresh", mainController.controllers.handleRefreshToken);

router.get("/logout", mainController.controllers.handleLogout);

router.post("/register", auth, mainController.controllers.register);

router.post("/forgot", validate(forgotValidator), mainController.controllers.forgot);

router.post("/resetpassword/:id/:token", validate(resetValidator), mainController.controllers.reset);

router.post("/change-email", auth, validate(changeEmailValidator), mainController.controllers.changeEmail);

router.post(
  "/change-password",
  auth,
  validate(changePasswordValidator),
  mainController.controllers.changePassword
);

module.exports = router;
