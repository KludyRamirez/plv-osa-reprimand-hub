const Notification = require("../models/Notifications");

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate("userId", "uid userName firstName surName")
      .sort({ createdAt: -1 })
      .exec();
    res.json(notifications);
  } catch (error) {
    return res.status(500).send("An error occurred, please try again!");
  }
};

module.exports = {
  getNotifications,
};
