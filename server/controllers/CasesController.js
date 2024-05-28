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

    // Find the latest reset offense number
    const latestResetOffense = await Case.findOne({})
      .sort({ resetOffense: -1 })
      .limit(1);
    let newResetOffense = 1;
    if (
      latestResetOffense &&
      !isNaN(parseInt(latestResetOffense.resetOffense))
    ) {
      newResetOffense = parseInt(latestResetOffense.resetOffense) + 1;
    }

    // Find the user
    const studentNew = await Student.findById(student);

    // Count existing cases with the same criteria
    const existingCasesCount = await Case.countDocuments({
      studentNo: studentNew.studentNo,
      reportedViolation: reportedViolation,
      statusOfCase: {
        $in: [
          "Pending",
          "Investigation",
          "Evaluation",
          "Undertaking",
          "Dismissed",
          "Categorization",
          "Show Cause",
          "Referral",
          "Hearing",
          "Decision",
          "Appeal",
          "Implementation",
        ],
      },
      resetOffense: 0,
    });
    console.log(existingCasesCount);

    const existingMajorCasesCount = await Case.countDocuments({
      studentNo: studentNew.studentNo,
      statusOfCase: {
        $in: [
          "Pending",
          "Investigation",
          "Evaluation",
          "Undertaking",
          "Dismissed",
          "Categorization",
          "Show Cause",
          "Referral",
          "Hearing",
          "Decision",
          "Appeal",
          "Implementation",
        ],
      },
      resetOffense: 0,
      typeOfViolation: "Major",
    });
    console.log(existingMajorCasesCount);

    if (existingCasesCount === 0) {
      await Case.create({
        ...req.body,
        caseNo: newCaseNo,
        offense: "1st",
      });
    } else if (existingCasesCount === 1) {
      await Case.create({
        ...req.body,
        caseNo: newCaseNo,
        offense: "2nd",
      });
    } else if (existingCasesCount === 2) {
      await Case.create({
        ...req.body,
        caseNo: newCaseNo,
        offense: "3rd",
      });
    } else if (existingCasesCount === 3) {
      await Case.create({
        ...req.body,
        caseNo: newCaseNo,
        offense: "4th",
      });
    } else if (existingCasesCount >= 4) {
      await Case.updateMany(
        {
          studentNo: studentNew.studentNo,
          violation: reportedViolation,
          statusOfCase: {
            $in: [
              "Pending",
              "Investigation",
              "Evaluation",
              "Undertaking",
              "Dismissed",
              "Categorization",
              "Show Cause",
              "Referral",
              "Hearing",
              "Decision",
              "Appeal",
              "Implementation",
            ],
          },
        },
        { resetOffense: newResetOffense }
      );

      await Case.create({
        ...req.body,
        caseNo: newCaseNo,
        offense: "1st",
      });
    }

    if (existingMajorCasesCount === 3) {
      await Student.findByIdAndUpdate(
        student,
        { statusOfStudent: "Dismissed" },
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

module.exports = {
  createCase,
  getCases,
  editCase,
  patchCase,
  remarksCase,
  deleteOneCase,
  deleteManyCase,
};
