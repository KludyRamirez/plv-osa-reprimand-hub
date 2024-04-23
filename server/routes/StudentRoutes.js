const express = require("express");
const router = express.Router();
const mainController = require("../controllers/MainController");

// const { VerifyJWT } = require("../middleware/VerifyJWT");
// const { VerifyRoles } = require("../middleware/VerifyRoles");

// const auth = VerifyJWT;
// const admin = VerifyRoles;

router.post("/student", mainController.controllers.createStudent);

router.get("/student", mainController.controllers.getStudents);

router.delete("/student/:id", mainController.controllers.deleteOneStudent);

router.delete(
  "/students/deleteSelected",
  mainController.controllers.deleteManyStudent
);

module.exports = router;
