const loanModel = require("../Models/loan");
require("dotenv").config();
const nodemailer = require("nodemailer");
const hbs = require("handlebars");
const userModel = require("../Models/user");
const moneyModel = require("../Models/money");

const transport = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 465, //465:ssl , 587 :tsl
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  host: "smtp.gmail.com",
});

const postingLoan = async (req, res) => {
  try {
    const isExist = await loanModel.findOne({
      student_id: req.body.student_id,
    });
    if (isExist) {
      return res.send("User has already taken the loan !!!");
    }

    const newLoan = new loanModel({
      ...req.body,
    });
    await newLoan.save();

    const student = await userModel.findOne({ _id: req.body.student_id });

    const content = `<div>
        <h1>Hello {{name}}</h1>
        <h3>Your loan has been approved successfully !!</h3>
        <h3>Credited Amount : {{amount}}</h3>
        <h3>Due Date : {{dueDate}}</h3>
      </div>`;

    const template = hbs.compile(content);

    transport
      .sendMail({
        from: process.env.EMAIL,
        to: student.email,
        subject: "Congratulations ✨🎉, Loan Approved !!",

        html: template({
          name: student.name,
          amount: newLoan.amount,
          duedate: new Date(newLoan.duedate),
        }),
      })
      .then(async (responce) => {
        const user = await moneyModel.findOne({
          student_id: req.body.student_id,
        });
        if (user) {
          await moneyModel.updateOne(
            { student_id: req.body.student_id },
            { $set: { balance: user.balance + Number(newLoan.amount) } }
          );
        }
        return res.send("User's Loan Approved!!!");
      });
  } catch (err) {
    console.log("err:", err);
    return res.sendStatus(400);
  }
};

const isTakenLoan = async (req, res) => {
  const { student_id } = req.params;
  try {
    const isExist = await loanModel.findOne({
      student_id: student_id,
    });

    if (isExist) {
      return res.send({ isTaken: true, loanAmount: isExist.amount });
    }
    return res.send({ isTaken: false, loanAmount: 0 });
  } catch (err) {
    return res.sendStatus(404);
  }
};

module.exports = { postingLoan, isTakenLoan };
