const { Schema, model } = require("mongoose");
const userModel = require("./user");

const loanSchema = new Schema({
  student_id: { type: Schema.Types.ObjectId, required: true, ref: userModel },
  amount: { type: String, required: true, default: 0 },
  duedate: { type: String, required: true },
  bankname: { type: String, required: false },
  accountnumber: { type: Number, required: false },
  ifsc: { type: String, required: false },
  upi_id: { type: String, required: false },
});

const loanModel = model("loan", loanSchema);

module.exports = loanModel;
