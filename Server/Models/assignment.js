const { Schema, model } = require("mongoose");
const userModel = require("./user");

const assignmentSchema = new Schema(
  {
    name: { type: String, required: true },
    instructor: { type: Schema.Types.ObjectId, required: true, ref: userModel },
    description: { type: String, required: true },
    topic: { type: String, required: true },
    deadline: { type: Date, required: true },
    unit: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const assignmentModel = model("assignment", assignmentSchema);

module.exports = assignmentModel;
