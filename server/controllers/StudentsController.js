const Student = require("../model/Students");

const createStudent = async (req, res) => {
  try {
    const newStudent = await new Student({
      ...req.body,
    }).save();
    res.json(newStudent);
  } catch (error) {
    return res.status(400).send("Create Schedule Error!");
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      // .populate("schedules.schedule")
      // .populate("orderdBy", "fullname mail")
      .exec();
    res.json(students);
  } catch (error) {
    return res.status(500).send("An error occurred, please try again!");
  }
};

module.exports = { createStudent, getStudents };
