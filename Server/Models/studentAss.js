const { Schema, model } = require("mongoose");
const assignmentModel = require("./assignment");
const userModel = require("./user");

const studentAssSchema = new Schema({
  student_id: { type: Schema.Types.ObjectId, required: true, ref: userModel },
  assignment_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: assignmentModel,
  },
  isCompleted: { type: Boolean, required: true, default: false },
});

const studentAssModel = model("studentAss", studentAssSchema);

module.exports = studentAssModel;
