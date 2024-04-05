const { createStudent } = require("../controllers/StudentsController");
const { getStudents } = require("../controllers/StudentsController");

exports.controllers = {
  createStudent,
  getStudents,
};
