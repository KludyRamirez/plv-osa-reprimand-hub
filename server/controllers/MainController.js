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
const { deleteOneUser } = require("../controllers/UsersController");
const { deleteManyUser } = require("../controllers/UsersController");

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
  deleteOneUser,
  deleteManyUser,
  //
  getNotifications,
};
