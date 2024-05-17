const express = require("express");
const router = express.Router();
const mainController = require("../controllers/MainController");

const { VerifyJWT } = require("../middlewares/VerifyJWT");
const { VerifyRoles } = require("../middlewares/VerifyRoles");

const auth = VerifyJWT;
const role = VerifyRoles;

router.get(
  "/notification",
  auth,
  role(["Administrator"]),
  mainController.controllers.getNotifications
);

module.exports = router;
