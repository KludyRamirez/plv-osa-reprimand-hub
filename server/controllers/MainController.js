//auth

const { Login } = require("../controllers/authentication/Login");
const { Register } = require("../controllers/authentication/Register");

//create student

const { createStudent } = require("../controllers/StudentsController");
const { getStudents } = require("../controllers/StudentsController");
const { deleteOneStudent } = require("../controllers/StudentsController");
const { deleteManyStudent } = require("../controllers/StudentsController");

exports.controllers = {
  Login,
  Register,

  createStudent,
  getStudents,
  deleteOneStudent,
  deleteManyStudent,
};
