const moneyModel = require("../Models/money");

const budgetSetter = async (req, res) => {
  const { user_id, budget } = req.body;

  try {
    const isExist = await moneyModel.findOne({ student_id: user_id });
    if (isExist) {
      const updateExist = await moneyModel.updateOne(
        { student_id: user_id },
        { $set: { budget: budget, balance: budget } }
      );
      return res.send("updated successfully");
    }
    const newMoney = new moneyModel({
      student_id: user_id,
      budget: budget,
      balace: budget,
    });
    await newMoney.save();
    return res.send(newMoney);
  } catch (err) {
    console.log("err:", err);
    return res.sendStatus(400);
  }
};

const gettingDataWithPerDay = async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await moneyModel.findOne({ student_id: user_id });
    const perDay = Math.floor(user.budget / 30);
    return res.send({ balance: user.balance, budgetPerDay: perDay });
  } catch (err) {
    return res.sendStatus(404);
  }
};
//change this balance key
const minusFromBudget = async (req, res) => {
  const { user_id, value } = req.body;
  try {
    const isExist = await moneyModel.findOne({ student_id: user_id });
    if (!isExist) {
      return sendStatus(404);
    }
    const updateBudget = await moneyModel.updateOne(
      { student_id: user_id },
      {
        $set: { balance: isExist.balance - value },
        $push: { history: { value: value, date: new Date() } },
      }
    );
    return res.send("updated");
  } catch (err) {
    return res.sendStatus(404);
  }
};

const settingRemainder = async (req, res) => {
  const { user_id, reminder } = req.body;
  try {
    const isExist = await moneyModel.findOne({ student_id: user_id });

    if (!isExist) {
      return res.sendStatus(404);
    }
    const setRemainder = await moneyModel.updateOne(
      { student_id: user_id },
      { $set: { remainder: reminder } }
    );
    res.send("Remainder set");
  } catch (err) {
    return res.sendStatus(404);
  }
};

//nodemailer
// console.log(date.getHours());
// console.log(date.getMinutes());

// const transport = nodemailer.createTransport({
//   service: "gmail",
//   secure: false,
//   port: 465, //465:ssl , 587 :tsl
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASS,
//   },
//   host: "smtp.gmail.com",
// });

// setInterval(() => {
//   const date = new Date();
//   let string = `${date.getHours()}:${date.getMinutes()}`;
//   if (string === "23:57") {
//     // transport
//     //   .sendMail({
//     //     from: process.env.EMAIL,
//     //     to: req.body.mail,
//     //     subject: "here is your otp.",
//     //     // text: "hellow world 1234 monodb is good",
//     //     html: template({ otp: otp }),
//     //   })
//     //   .then((responce) => {
//     //     return res.send({
//     //       message: "user signup successfully",
//     //       id: newUser._id,
//     //     });
//     //   });
//   }
// }, 60000);

module.exports = {
  budgetSetter,
  gettingDataWithPerDay,
  minusFromBudget,
  settingRemainder,
};
 