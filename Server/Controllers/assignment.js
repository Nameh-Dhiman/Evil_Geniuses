const assignmentModel = require("../Models/assignment");
const studentAssModel = require("../Models/studentAss");
const userModel = require("../Models/user");

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
    const students = await userModel.find({ unit: req.body.unit });
    for (let el of students) {
      const studentAss = new studentAssModel({
        student_id: el._id,
        assignment_id: newAssignment._id,
        isCompleted: false,
      });
      await studentAss.save();
    }
    return res.send(newAssignment);
  } catch (err) {
    return res.status(403).send("Something went wrong");
  }
};

module.exports = { getAll, postOne };
