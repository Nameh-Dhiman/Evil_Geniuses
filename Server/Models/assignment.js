const { Schema, model } = require("mongoose");
const userModel = require("./user");

const assignmentSchema = new Schema(
  {
    name: { type: String, required: true },
    instructor: { type: Schema.Types.ObjectId, required: true },
    description: { type: String, required: true },
    tags: { type: String, required: true, enum: ["coding", "dsa", "other"] },
    deadline: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const assignmentModel = model("assignment", assignmentSchema);

module.exports = assignmentModel;
