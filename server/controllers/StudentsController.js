const Student = require("../models/Students");
const Notification = require("../models/Notifications");

const createStudent = async (req, res) => {
  try {
    const { firstName, surName } = req.body;

    const userData = req.user;

    const newStudent = await Student.create(req.body);

    await Notification.create({
      userId: userData._id,
      message: `Successfully added ${firstName} ${surName} as a student`,
      createdAt: new Date(),
    });

    res.status(200).json({
      message: "Successfully added new student!",
      data: newStudent,
    });
  } catch (error) {
    console.error("Error adding student:", error);
    res
      .status(400)
      .send("An error occurred while adding the student, please try again!");
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    return res.status(500).send("An error occurred, please try again!");
  }
};

const editStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedValues = req.body;
    const student = await Student.findByIdAndUpdate(id, updatedValues, {
      new: true,
    });
    res.status(200).json({
      data: student,
      message: "Successfully edited student values.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to edit student values!" });
  }
};

const deleteOneStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found!" });
    }
    res.status(200).json({
      message: "Successfully deleted a student!",
    });
  } catch (err) {
    res.status(400).json({
      message: "Deletion failed!",
    });
  }
};

const deleteManyStudent = async (req, res) => {
  try {
    const { students } = req.body;
    await Student.deleteMany({ _id: { $in: students } });
    res.status(200).json({ message: "Selected tasks deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createStudent,
  getStudents,
  editStudent,
  deleteOneStudent,
  deleteManyStudent,
};
