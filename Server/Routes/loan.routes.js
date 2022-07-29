const { Router } = require("express");
const { postingLoan } = require("../Controllers/loan");

const loanRouter = Router();

loanRouter.post("/approve", postingLoan);

module.exports = loanRouter;
