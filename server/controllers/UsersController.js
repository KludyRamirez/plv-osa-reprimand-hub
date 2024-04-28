const User = require("../models/Users");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    return res.status(500).send("An error occurred, please try again!");
  }
};

const deleteOneUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found!" });
    }
    res.status(200).json({
      message: "Successfully deleted a user!",
    });
  } catch (err) {
    res.status(400).json({
      message: "Deletion failed!",
    });
  }
};

const deleteManyUser = async (req, res) => {
  try {
    const { users } = req.body;
    await User.deleteMany({ _id: { $in: users } });
    res.status(200).json({ message: "Selected users deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  deleteOneUser,
  deleteManyUser,
};
