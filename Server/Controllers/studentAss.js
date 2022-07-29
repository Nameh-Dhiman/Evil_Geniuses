const studentAssModel = require("../Models/studentAss");
const assignmentModel = require("../Models/assignment");
const userModel = require("../Models/user");

const assignmentPatcher = async (req, res) => {
  const { user_id, assignment_id, isCompleted } = req.body;

  try {
    const isExist = await studentAssModel.findOne({
      student_id: user_id,
      assignment: assignment_id,
    });
    if (isExist) {
      const update = await studentAssModel.updateOne(
        {
          student_id: user_id,
          assignment: assignment_id,
        },
        { $set: { isCompleted: isCompleted } }
      );
      return res.send("assignment Updated successfully");
    }
    const newAssignment = new studentAssModel({
      student_id: user_id,
      assignment: assignment_id,
      isCompleted: isCompleted,
    });
    newAssignment.save();
    return res.send("assignment created successfully");
  } catch (err) {
    return res.status(400).send("Somthing went Wrong");
  }
};

const assignmentGetter = async (req, res) => {
  const { user_id } = req.params;
  try {
    const assignments = await studentAssModel
      .find({ student_id: user_id })
      .populate({
        path: "assignment",
        model: assignmentModel,
        populate: {
          path: "instructor",
          model: userModel,
        },
      });

    return res.send(assignments);
  } catch (err) {
    console.log("err:", err);
    return res.sendStatus(404);
  }
};

const studentAssCount = async (req, res) => {
  const { student_id } = req.params;

  try {
    const total = await studentAssModel
      .find({ student_id: student_id })
      .count();
    const completed = await studentAssModel
      .find({
        student_id: student_id,
        isCompleted: true,
      })
      .count();
    return res.send({
      total: total,
      completed: completed,
    });
  } catch (err) {
    return res.sendStatus(404);
  }
};

module.exports = { assignmentPatcher, assignmentGetter, studentAssCount };
