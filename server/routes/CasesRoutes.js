const express = require("express");
const router = express.Router();
const mainController = require("../controllers/MainController");

const { VerifyJWT } = require("../middlewares/VerifyJWT");
const { VerifyRoles } = require("../middlewares/VerifyRoles");

const auth = VerifyJWT;
const role = VerifyRoles;

router.post(
  "/case",
  auth,
  role(["Administrator"]),
  mainController.controllers.createCase
);

router.get(
  "/case",
  auth,
  role(["Administrator", "Instructor"]),
  mainController.controllers.getCases
);

router.put(
  "/case/:id",
  auth,
  role(["Administrator"]),
  mainController.controllers.editCase
);

router.put(
  "/caseStatus/:id",
  auth,
  role(["Administrator"]),
  mainController.controllers.patchCase
);

router.put(
  "/caseRemarks/:id",
  auth,
  role(["Administrator", "Instructor"]),
  mainController.controllers.remarksCase
);

router.delete(
  "/case/:id",
  auth,
  role(["Administrator"]),
  mainController.controllers.deleteOneCase
);

router.delete(
  "/cases/deleteSelected",
  auth,
  role(["Administrator"]),
  mainController.controllers.deleteManyCase
);

module.exports = router;
