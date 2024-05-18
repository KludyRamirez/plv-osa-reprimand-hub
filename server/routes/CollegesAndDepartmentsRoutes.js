const express = require("express");
const router = express.Router();
const mainController = require("../controllers/MainController");

const { VerifyJWT } = require("../middlewares/VerifyJWT");
const { VerifyRoles } = require("../middlewares/VerifyRoles");

const auth = VerifyJWT;
const role = VerifyRoles;

router.post(
  "/cad",
  auth,
  role(["Administrator"]),
  mainController.controllers.createCad
);

router.get(
  "/cad",
  auth,
  role(["Administrator", "Instructor"]),
  mainController.controllers.getCads
);

router.delete(
  "/cad/:id",
  auth,
  role(["Administrator"]),
  mainController.controllers.deleteOneCad
);

router.delete(
  "/cads/deleteSelected",
  auth,
  role(["Administrator"]),
  mainController.controllers.deleteManyCad
);

module.exports = router;
