const express = require("express");
const router = express.Router();
const mainController = require("../controllers/MainController");

const { VerifyJWT } = require("../middlewares/VerifyJWT");
const { VerifyRoles } = require("../middlewares/VerifyRoles");

const auth = VerifyJWT;
const role = VerifyRoles;

router.get(
  "/user",
  auth,
  role(["Administrator"]),
  mainController.controllers.getUsers
);

router.delete(
  "/user/:id",
  auth,
  role(["Administrator"]),
  mainController.controllers.deleteOneUser
);

router.delete(
  "/users/deleteSelected",
  auth,
  role(["Administrator"]),
  mainController.controllers.deleteManyUser
);

module.exports = router;
