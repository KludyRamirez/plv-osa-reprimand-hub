const Student = require("../model/Students");

const createStudent = async (req, res) => {
  const { firstName, lastName } = req.body;

  const userData = req.user;

  try {
    const newStudent = await new Student({
      ...req.body,
    }).save();

    // const notification = new Notification({
    //   userId: userData._id,
    //   message: `Successfully added ${firstName} ${lastName} as a student`,
    //   createdAt: new Date(),
    // });

    // await notification.save();

    res.status(200).json({
      message: "Successfully added new student!",
      data: newStudent,
    });
  } catch (error) {
    return res
      .status(400)
      .send("An error occurred on adding student, please try again!");
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
  deleteOneStudent,
  deleteManyStudent,
};
