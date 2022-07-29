const userModel = require("../Models/user");

const getAllInstructors = async (req, res) => {
  try {
    const allInstructors = await userModel.find({ role: "instructor" });
    return res.send(allInstructors);
  } catch (err) {
    return res.sendStatus(404);
  }
};

const updateUser = async (req, res) => {
  const { marks } = req.body;
  const { id } = req.params;
  try {
    const up = await userModel.updateOne(
      { _id: id },
      { $set: { marks: marks } }
    );
    return res.send("updated");
  } catch (err) {
    return res.sendStatus(404);
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findOne({ _id: id });
    return res.send(user);
  } catch (err) {
    return res.sendStatus(404);
  }
};

module.exports = { getAllInstructors, updateUser, getUser };
