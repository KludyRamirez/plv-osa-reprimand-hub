const Case = require("../models/Cases");
const Student = require("../models/Students");
const Notification = require("../models/Notifications");

const createCase = async (req, res) => {
  try {
    const { student, reportedViolation } = req.body;
    const userData = req.user;

    // Find the latest case number
    const latestCase = await Case.findOne({}).sort({ caseNo: -1 }).limit(1);
    let newCaseNo = 1;
    if (latestCase && !isNaN(parseInt(latestCase.caseNo))) {
      newCaseNo = parseInt(latestCase.caseNo) + 1;
    }

    // Find the user
    const studentNew = await Student.findById(student);

    // Count all existing cases with the same student and violation
    const existingCasesCount = await Case.countDocuments({
      student: student,
      reportedViolation: reportedViolation,
    });

    const offenseLabels = ["1st", "2nd", "3rd", "4th"];
    const offenseIndex = Math.min(existingCasesCount, 3);
    const offense = offenseLabels[offenseIndex];

    await Case.create({
      ...req.body,
      caseNo: newCaseNo,
      offense,
    });

    // 4th offense of the same violation → Subject For Dismissal
    if (existingCasesCount === 3) {
      await Student.findByIdAndUpdate(
        student,
        { statusOfStudent: "Subject For Dismissal" },
        { new: true }
      );
    }

    await Notification.create({
      userId: userData._id,
      typeOfNotif: "Cases",
      actionOfNotif: "Add",
      message: `Case no. ${newCaseNo} was created successfully.`,
      createdAt: new Date(),
    });

    res.status(200).json({
      message: `Case no. ${newCaseNo} was created successfully.`,
    });
  } catch (error) {
    console.error("Error adding case:", error);
    res
      .status(400)
      .send("An error occurred while adding the case, please try again!");
  }
};

const getCases = async (req, res) => {
  try {
    const cases = await Case.find()
      .populate(
        "student",
        "caseNo studentNo firstName surName department college year section"
      )
      .exec();
    res.json(cases);
  } catch (error) {
    return res.status(500).send("An error occurred, please try again!");
  }
};

const editCase = async (req, res) => {
  try {
    const userData = req.user;

    const { caseNo } = req.body;

    const { id } = req.params;

    const theCase = await Case.findByIdAndUpdate(
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
      typeOfNotif: "Cases",
      actionOfNotif: "Update",
      message: `Case No. ${caseNo} has been updated successfully.`,
      createdAt: new Date(),
    });

    res.status(200).json({
      data: theCase,
      message: `Case No. ${caseNo} has been updated successfully.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to edit case values!" });
  }
};

const patchCase = async (req, res) => {
  try {
    const userData = req.user;

    const { caseNo } = req.body;

    const { id } = req.params;

    const theCase = await Case.findByIdAndUpdate(
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
      typeOfNotif: "Cases",
      actionOfNotif: "Update One",
      message: `Case No. ${caseNo} status has been updated successfully.`,
      createdAt: new Date(),
    });

    res.status(200).json({
      data: theCase,
      message: `Case No. ${caseNo} status has been updated successfully.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to edit case status!" });
  }
};

const remarksCase = async (req, res) => {
  try {
    const userData = req.user;

    const { caseNo } = req.body;

    const { id } = req.params;

    const theCase = await Case.findByIdAndUpdate(
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
      typeOfNotif: "Cases",
      actionOfNotif: "Update One",
      message: `Case No. ${caseNo} remarks has been updated succesfully.`,
      createdAt: new Date(),
    });

    res.status(200).json({
      data: theCase,
      message: `Case No. ${caseNo} remarks has been updated succesfully.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update case remarks!" });
  }
};

// const patchCase = async (req, res) => {
//   try {
//     const userData = req.user;

//     const { statusOfCase, caseNo } = req.body;

//     await Case.findByIdAndUpdate(req.params.id, { statusOfCase });

//     await Notification.create({
//       userId: userData._id,
//       message: `Case No. ${caseNo} status has been changed to ${statusOfCase}`,
//       createdAt: new Date(),
//     });

//     res.status(200).json({
//       message: `Case No. ${caseNo} status has been changed to ${statusOfCase}`,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to change case status." });
//   }
// };

const deleteOneCase = async (req, res) => {
  try {
    const userData = req.user;

    const deletedCase = await Case.findByIdAndDelete(req.params.id);
    if (!deletedCase) {
      return res.status(404).json({ error: "Case not found!" });
    }

    await Notification.create({
      userId: userData._id,
      typeOfNotif: "Cases",
      actionOfNotif: "Delete",
      message: `Case No. ${deletedCase.caseNo} has been deleted successfully.`,
      createdAt: new Date(),
    });

    res.status(200).json({
      message: `Case No. ${deletedCase.caseNo} has been deleted successfully.`,
    });
  } catch (err) {
    res.status(400).json({
      message: `Case was not deleted.`,
    });
  }
};

const deleteManyCase = async (req, res) => {
  try {
    const userData = req.user;

    const { cases } = req.body;
    await Case.deleteMany({ _id: { $in: cases } });

    await Notification.create({
      userId: userData._id,
      typeOfNotif: "Cases",
      actionOfNotif: "Delete",
      message: `Selected cases has been deleted successfully.`,
      createdAt: new Date(),
    });

    res
      .status(200)
      .json({ message: "Selected cases has been deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const recalculateOffenses = async (req, res) => {
  try {
    const offenseLabels = ["1st", "2nd", "3rd", "4th"];

    // Get all unique student (ObjectId) + violation combos
    const combos = await Case.aggregate([
      {
        $group: {
          _id: { student: "$student", reportedViolation: "$reportedViolation" },
        },
      },
    ]);

    let updatedCount = 0;
    const studentsWithFourthOffense = new Set();

    for (const combo of combos) {
      const { student, reportedViolation } = combo._id;

      // Get all cases for this combo sorted oldest first
      const cases = await Case.find({ student, reportedViolation }).sort({ createdAt: 1 });

      for (let i = 0; i < cases.length; i++) {
        const label = offenseLabels[Math.min(i, 3)];
        if (cases[i].offense !== label) {
          await Case.findByIdAndUpdate(cases[i]._id, { offense: label });
          updatedCount++;
        }
      }

      // If 4+ cases, mark student as Subject For Dismissal
      if (cases.length >= 4) {
        studentsWithFourthOffense.add(student.toString());
        await Student.findByIdAndUpdate(
          student,
          { statusOfStudent: "Subject For Dismissal" }
        );
      }
    }

    // Reset students who are incorrectly marked as "Subject For Dismissal"
    // (they don't actually have 4+ cases of the same violation)
    const incorrectStudents = await Student.find({
      statusOfStudent: "Subject For Dismissal",
    });

    let statusResetCount = 0;
    for (const s of incorrectStudents) {
      if (!studentsWithFourthOffense.has(s._id.toString())) {
        await Student.findByIdAndUpdate(s._id, {
          statusOfStudent: "Enrolled",
        });
        statusResetCount++;
      }
    }

    res.status(200).json({
      message: `Recalculated offenses. ${updatedCount} case(s) updated. ${statusResetCount} student(s) reset from "Subject For Dismissal" to "Enrolled".`,
      updatedCount,
      statusResetCount,
    });
  } catch (error) {
    console.error("Failed to recalculate offenses.", error);
    res.status(500).send("An error occurred while recalculating offenses.");
  }
};

module.exports = {
  createCase,
  getCases,
  editCase,
  patchCase,
  remarksCase,
  deleteOneCase,
  deleteManyCase,
  recalculateOffenses,
};
