const userModel = require("../Models/user");

const getAllInstructors = async (req, res) => {
  try {
    const allInstructors = await userModel.find({ role: "instructor" });
    return res.send(allInstructors);
  } catch (err) {
    return res.sendStatus(404);
  }
};

module.exports = { getAllInstructors };
