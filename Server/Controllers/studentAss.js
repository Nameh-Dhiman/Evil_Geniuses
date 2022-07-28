const studentAssModel = require("../Models/studentAss");

const assignmentPatcher = async (req, res) => {
  const { user_id, assignment_id, isCompleted } = req.body;

  try {
    const isExist = await studentAssModel.findOne({
      student_id: user_id,
      assignment_id: assignment_id,
    });
    if (isExist) {
      const update = await studentAssModel.updateOne(
        {
          student_id: user_id,
          assignment_id: assignment_id,
        },
        { $set: { isCompleted: isCompleted } }
      );
      return res.send("assignment Updated successfully");
    }
    const newAssignment = new studentAssModel({
      student_id: user_id,
      assignment_id: assignment_id,
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
    const assignments = await studentAssModel.find({ student_id: user_id });
    return res.send(assignments);
  } catch (err) {
    return res.sendStatus(404);
  }
};

module.exports = { assignmentPatcher, assignmentGetter };
