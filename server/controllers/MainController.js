//auth

const { login } = require("../controllers/authentication/Login");
const { register } = require("../controllers/authentication/Register");

//students

const { createStudent } = require("../controllers/StudentsController");
const { getStudents } = require("../controllers/StudentsController");
const { editStudent } = require("../controllers/StudentsController");
const { deleteOneStudent } = require("../controllers/StudentsController");
const { deleteManyStudent } = require("../controllers/StudentsController");

//users

const { getUsers } = require("../controllers/UsersController");
const { editUser } = require("../controllers/UsersController");
const { deleteOneUser } = require("../controllers/UsersController");
const { deleteManyUser } = require("../controllers/UsersController");

//cases

const { createCase } = require("../controllers/CasesController");
const { getCases } = require("../controllers/CasesController");
const { editCase } = require("../controllers/CasesController");
const { patchCase } = require("../controllers/CasesController");
const { deleteOneCase } = require("../controllers/CasesController");
const { deleteManyCase } = require("../controllers/CasesController");

//notification

const { getNotifications } = require("../controllers/NotificationsController");

exports.controllers = {
  login,
  register,
  //
  createStudent,
  getStudents,
  editStudent,
  deleteOneStudent,
  deleteManyStudent,
  //
  getUsers,
  editUser,
  deleteOneUser,
  deleteManyUser,
  //
  createCase,
  getCases,
  editCase,
  patchCase,
  deleteOneCase,
  deleteManyCase,
  //
  getNotifications,
};
