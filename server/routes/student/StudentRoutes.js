const express = require("express");
const router = express.Router();
const mainController = require("../../controllers/MainController");

const { VerifyJWT } = require("../../middleware/VerifyJWT");
const { VerifyRoles } = require("../../middleware/VerifyRoles");

const auth = VerifyJWT;
const admin = VerifyRoles;

router.post("/student", auth, admin, mainController.controllers.createStudent);

router.get("/student", auth, admin, mainController.controllers.getStudents);

module.exports = router;
