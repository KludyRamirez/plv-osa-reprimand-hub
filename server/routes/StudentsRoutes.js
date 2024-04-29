const express = require("express");
const router = express.Router();
const mainController = require("../controllers/MainController");

const { VerifyJWT } = require("../middlewares/VerifyJWT");
const { VerifyRoles } = require("../middlewares/VerifyRoles");

const auth = VerifyJWT;
const role = VerifyRoles;

router.post(
  "/student",
  auth,
  role(["Administrator"]),
  mainController.controllers.createStudent
);

router.get(
  "/student",
  auth,
  role(["Administrator"]),
  mainController.controllers.getStudents
);

router.put(
  "/student/:id",
  auth,
  role(["Administrator"]),
  mainController.controllers.editStudent
);

router.delete(
  "/student/:id",
  auth,
  role(["Administrator"]),
  mainController.controllers.deleteOneStudent
);

router.delete(
  "/students/deleteSelected",
  auth,
  role(["Administrator"]),
  mainController.controllers.deleteManyStudent
);

module.exports = router;
