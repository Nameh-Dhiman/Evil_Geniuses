const assignmentModel = require("../Models/assignment");

const getAll = async (req, res) => {
  try {
    const data = await assignmentModel.find();
    return res.send(data);
  } catch (err) {
    return res.sendStatus(404);
  }
};

const postOne = async (req, res) => {
  try {
    const newAssignment = new assignmentModel({ ...req.body });
    await newAssignment.save();
    return res.send(newAssignment);
  } catch (err) {
    return res.status(403).send("Something went wrong");
  }
};

module.exports = { getAll, postOne };
