const { Router } = require("express");
const {
  budgetSetter,
  gettingDataWithPerDay,
  minusFromBudget,
  settingRemainder,
} = require("../Controllers/money");
const moneyRouter = Router();

moneyRouter.post("/budget", budgetSetter);
moneyRouter.get("/:user_id", gettingDataWithPerDay);
moneyRouter.post("/reduce", minusFromBudget);
moneyRouter.post("/remainder", settingRemainder);

module.exports = moneyRouter;
