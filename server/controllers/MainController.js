const { createStudent } = require("../controllers/StudentsController");
const { getStudents } = require("../controllers/StudentsController");
const { deleteOneStudent } = require("../controllers/StudentsController");
const { deleteManyStudent } = require("../controllers/StudentsController");

exports.controllers = {
  createStudent,
  getStudents,
  deleteOneStudent,
  deleteManyStudent,
};
