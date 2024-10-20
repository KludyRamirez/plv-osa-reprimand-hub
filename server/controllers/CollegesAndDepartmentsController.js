const Cad = require("../models/CollegesAndDepartments");
const Notification = require("../models/Notifications");

const createCad = async (req, res) => {
  try {
    const userData = req.user;

    const { college, department } = req.body;

    const cadExists = await Cad.exists({
      college: college,
      department: department,
    });

    if (cadExists) {
      return res
        .status(409)
        .send("College and department already exist. Please try again.");
    }

    const latestCad = await Cad.findOne({}).sort({ uid: -1 }).limit(1);

    let newUid = 1;

    if (latestCad && !isNaN(parseInt(latestCad.uid))) {
      newUid = parseInt(latestCad.uid) + 1;
    }

    const newCad = await Cad.create({
      uid: newUid,
      ...req.body,
    });

    await Notification.create({
      userId: userData._id,
      typeOfNotif: "Utilities",
      actionOfNotif: "Add",
      message: `Added ${college} - ${department}
      as a college and department successfully.`,
      createdAt: new Date(),
    });

    res.status(200).json({
      message: `Added ${college} - ${department}
      as a college and department successfully.`,
      data: newCad,
    });
  } catch (error) {
    res
      .status(400)
      .send(
        "An error occurred while adding the college and department, please try again!"
      );
  }
};

const getCads = async (req, res) => {
  try {
    const cad = await Cad.find();
    res.json(cad);
  } catch (error) {
    return res.status(500).send("An error occurred, please try again!");
  }
};

const getCad = async (req, res) => {
  try {
    const cad = await Cad.findById(req.params.id);

    if (!cad) {
      return res.status(404).json({ message: "cad not found" });
    }
    res.json(cad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteOneCad = async (req, res) => {
  try {
    const userData = req.user;

    const deletedCad = await Cad.findByIdAndDelete(req.params.id);

    if (!deletedCad) {
      return res.status(404).json({ error: "Cad not found!" });
    }

    await Notification.create({
      userId: userData._id,
      typeOfNotif: "Utilities",
      actionOfNotif: "Delete",
      message: `${deletedCad.college} ${deletedCad.department} has been deleted successfully.`,
      createdAt: new Date(),
    });

    res.status(200).json({
      message: `${deletedCad.college} ${deletedCad.department} has been deleted successfully.`,
    });
  } catch (err) {
    res.status(400).json({
      message: `Selected college and department was not deleted.`,
    });
  }
};

const deleteManyCad = async (req, res) => {
  try {
    const userData = req.user;

    const { cads } = req.body;
    await Cad.deleteMany({ _id: { $in: cads } });

    await Notification.create({
      userId: userData._id,
      typeOfNotif: "Utilities",
      actionOfNotif: "Delete",
      message: `Selected colleges and departments has been deleted successfully.`,
      createdAt: new Date(),
    });
    res.status(200).json({
      message:
        "Selected colleges and departments has been deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCad,
  getCads,
  getCad,
  deleteOneCad,
  deleteManyCad,
};
