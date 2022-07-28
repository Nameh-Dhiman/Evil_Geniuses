const { Schema, model } = require("mongoose");
const userModel = require("./user");

const loanSchema = new Schema({
  student_id: { type: Schema.Types.ObjectId, required: true, ref: userModel },
  amount: { type: Number, required: true, default: 0 },
  duedate: { type: Date, required: true },
  bankname: { type: String, required: true },
  banknumber: { type: Number, required: true },
  ifsc: { type: String, required: true },
});

const loanModel = model("loan", loanSchema);

module.exports = loanModel;
