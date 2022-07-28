const moneyModel = require("../Models/money");

const budgetSetter = async (req, res) => {
  const { user_id, budget } = req.body;

  try {
    const isExist = await moneyModel.findOne({ student_id: user_id });
    if (isExist) {
      const updateExist = await moneyModel.updateOne(
        { student_id: user_id },
        { $set: { budget: budget } }
      );
      return res.send("updated successfully");
    }
    const newMoney = new moneyModel({
      student_id: user_id,
      budget: budget,
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
    return res.send({ budget: user.budget, budgetPerDay: perDay });
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
      { $set: { budget: isExist.budget - value } }
    );
    return res.send("updated");
  } catch (err) {
    return res.sendStatus(404);
  }
};

const settingRemainder = async (req, res) => {
  const { user_id, remainder } = req.body;
  try {
    const isExist = await moneyModel.findOne({ student_id: user_id });

    if (!isExist) {
      return res.sendStatus(404);
    }
    const setRemainder = await moneyModel.updateOne(
      { student_id: user_id },
      { $set: { remainder: remainder } }
    );
    res.send("Remainder set");
  } catch (err) {
    return res.sendStatus(404);
  }
};

//nodemailer
// const date = new Date();
// console.log(date.getHours());
// console.log(date.getMinutes());

module.exports = {
  budgetSetter,
  gettingDataWithPerDay,
  minusFromBudget,
  settingRemainder,
};
