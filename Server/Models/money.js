const { Schema, model } = require("mongoose");
const userModel = require("./user");

const moneySchema = new Schema({
  student_id: { type: Schema.Types.ObjectId, required: true, ref: userModel },
  budget: { type: Number, required: true },
  remainder: { type: String, required: false },
});

const moneyModel = model("money", moneySchema);

module.exports = moneyModel;
