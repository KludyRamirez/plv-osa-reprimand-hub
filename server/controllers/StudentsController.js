const Student = require("../models/Students");
const Notification = require("../models/Notifications");

const createStudent = async (req, res) => {
  try {
    const { firstName, surName, studentNo } = req.body;

    const userData = req.user;

    const studentNoExists = await Student.exists({
      studentNo: studentNo,
    });

    if (studentNoExists) {
      return res
        .status(409)
        .send("Student no. already exist. Please try again.");
    }

    const newStudent = await Student.create(req.body);

    await Notification.create({
      userId: userData._id,
      typeOfNotif: "Students",
      actionOfNotif: "Add",
      message: `Added ${firstName} ${surName} as a student successfully.`,
      createdAt: new Date(),
    });

    res.status(200).json({
      message: `Added ${firstName} ${surName} as a student successfully.`,
      data: newStudent,
    });
  } catch (error) {
    console.error("Failed to add student.", error);
    res
      .status(400)
      .send("An error occurred while adding the student, please try again!");
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    const currentDate = new Date();

    for (const student of students) {
      if (currentDate.getMonth() === 11 && currentDate.getDate() === 31) {
        student.year += 1;
      }

      await student.save();
    }

    res.json(students);
  } catch (error) {
    return res.status(500).send("An error occurred, please try again!");
  }
};

const getStudent = async (req, res) => {
  try {
    const schedule = await Student.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const editStudent = async (req, res) => {
  try {
    const userData = req.user;

    const { studentNo } = req.body;

    const { id } = req.params;

    const student = await Student.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    await Notification.create({
      userId: userData._id,
      typeOfNotif: "Students",
      actionOfNotif: "Update",
      message: `Student No. ${studentNo} has been successfully updated.`,
      createdAt: new Date(),
    });

    res.status(200).json({
      data: student,
      message: `Student No. ${studentNo} has been successfully updated.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to edit student values!" });
  }
};

const deleteOneStudent = async (req, res) => {
  try {
    const userData = req.user;

    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ error: "Cannot find selected student." });
    }

    await Notification.create({
      userId: userData._id,
      typeOfNotif: "Students",
      actionOfNotif: "Delete",
      message: `Student No. ${deletedStudent.studentNo} has been deleted successfully.`,
      createdAt: new Date(),
    });

    res.status(200).json({
      message: `Student No. ${deletedStudent.studentNo} has been deleted successfully.`,
    });
  } catch (err) {
    res.status(400).json({
      message: `Selected student was not deleted.`,
    });
  }
};

const deleteManyStudent = async (req, res) => {
  try {
    const { students } = req.body;
    await Student.deleteMany({ _id: { $in: students } });

    await Notification.create({
      userId: userData._id,
      typeOfNotif: "Students",
      actionOfNotif: "Delete",
      message: `Selected students has been deleted successfully.`,
      createdAt: new Date(),
    });

    res
      .status(200)
      .json({ message: "Selected students has been deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudent,
  editStudent,
  deleteOneStudent,
  deleteManyStudent,
};
