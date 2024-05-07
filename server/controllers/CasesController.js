const Case = require("../models/Cases");
const Notification = require("../models/Notifications");
const moment = require("moment");

const createCase = async (req, res) => {
  try {
    const { student, reportedViolation, dateOfIncident, dateReported } =
      req.body;

    const userData = req.user;

    const latestCase = await Case.findOne({}).sort({ caseNo: -1 }).limit(1);

    let newCaseNo = 1;

    if (latestCase && !isNaN(parseInt(latestCase.caseNo))) {
      newCaseNo = parseInt(latestCase.caseNo) + 1;
    }

    const newCase = await Case.create({
      ...req.body,
      caseNo: newCaseNo,
    });

    await Notification.create({
      userId: userData._id,
      message: `Successfully added a new case!`,
      createdAt: new Date(),
    });

    res.status(200).json({
      message: `[Case no. ${newCaseNo} was successfully added]`,
      data: newCase,
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
    const { id } = req.params;
    const updatedValues = req.body;
    const theCase = await Case.findByIdAndUpdate(id, updatedValues, {
      new: true,
    });
    res.status(200).json({
      data: theCase,
      message: "Successfully edited case values.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to edit case values !" });
  }
};

const patchCase = async (req, res) => {
  try {
    const { statusOfCase } = req.body;
    await Case.findByIdAndUpdate(req.params.id, { statusOfCase });
    res
      .status(200)
      .json({ message: "Case status has been successfully changed." });
  } catch (error) {
    res.status(500).json({ error: "Failed to change case status." });
  }
};

const deleteOneCase = async (req, res) => {
  try {
    const deletedStudent = await Case.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found!" });
    }
    res.status(200).json({
      message: "The case has been deleted successfully !",
    });
  } catch (err) {
    res.status(400).json({
      message: "The case was not deleted !",
    });
  }
};

const deleteManyCase = async (req, res) => {
  try {
    const { cases } = req.body;
    await Case.deleteMany({ _id: { $in: cases } });
    res
      .status(200)
      .json({ message: "The selected cases has been deleted successfully !" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCase,
  getCases,
  editCase,
  patchCase,
  deleteOneCase,
  deleteManyCase,
};
